---
layout: post
title: "Pascal: Asynchronous Socket Programming with Encryption / Decryption"
---

**Blowfish, the cryptography unit**
See documentation [here](http://www.freepascal.org/docs-html/fcl/blowfish/index.html)

This unit implements encryption / decryption classes with keys, and is able to apply it on any TStream descendant. For easiness, we'll use TStringStream for the example. On to the code:

{% highlight pascal %}	
    {$mode objfpc}{$H+}    
uses  
  Classes,  
  BlowFish;  
  
var  
  en: TBlowFishEncryptStream;  
  de: TBlowFishDeCryptStream;  
  s1,s2: TStringStream;  
  key,value,temp: String;  
begin  
  { 1 }  
  key := 'testkey';  
  value := 'this is a string';  
  { 2 }  
  s1 := TStringStream.Create('');  
  en := TBlowFishEncryptStream.Create(key,s1);  
  { 3 }  
  en.WriteAnsiString(value);  
  en.Free;  
  WriteLn('encrypted: ' + s1.DataString);  
  { 4 }  
  s2 := TStringStream.Create(s1.DataString);  
  s1.Free;  
  { 5 }  
  de := TBlowFishDeCryptStream.Create(key,s2);  
  { 6 }  
  temp := de.ReadAnsiString;  
  WriteLn('decrypted: ' + temp);  
    
  de.Free;  
  s2.Free;  
end.
{% endhighlight %}

Explanations per curly brackets:

- First, we prepare the key (key) and data to be encrypted (value)
- Next, we create a TBlowFishEncryptStream instance, providing the key and stream to write the encrypted data into (s1)
- Now we write the unencrypted data. For testing, we output the encrypted data. You'll see that it would be a bunch of weird bytes
- Next, we will try to decrypt the data back to its original form. First, we create another TStringStream, this time we give the encrypted data as the stream data
- Then we create a TBlowFishDeCryptStream instance, providing the key that was used to encrypt the data and the stream from which the encrypted data would be read
- Next, read the data and output it. You'll see it's the original 'this is a string'

**fcl-net, the undocumented treasure**

This package offers a lot of networking things: asychronous socket, dns resolver, HTTP servlet, socket streams, etc. We would concentrate only on the asychronous socket (and implicitly, socket streams). At first glance, it looks uneasy to use. I have to dig in the sources to see how it works and guess how to use it. We will implement a server with multiple client support. To stay focus, the client will only connect, send a 'hello' message, then disconnects. The server would display notification for an incoming connection, the message sent by the client, and when the client disconnects. The server can only be terminated with Ctrl+C. Jump in to the server code:


{% highlight pascal %}	
{$mode objfpc}{$H+}  
uses  
  { 1 }  
  {$ifdef unix}cthreads,{$endif}  
  Classes,SysUtils,Sockets,fpAsync,fpSock;  
  
type  
  { 2 }  
  TClientHandlerThread = class(TThread)  
  private  
    FClientStream: TSocketStream;  
  public  
    constructor Create(AClientStream: TSocketStream);  
    procedure Execute; override;  
  end;  
  { 3 }  
  TTestServer = class(TTCPServer)  
  private  
    procedure TestOnConnect(Sender: TConnectionBasedSocket; AStream: TSocketStream);  
  public  
    constructor Create(AOwner: TComponent); override;  
  end;  
{ 4 }  
function AddrToString(Addr: TSockAddr): String;  
begin  
  Result := NetAddrToStr(Addr.sin_addr) + ':' + IntToStr(Addr.sin_port);  
end;  
  
{ TClientHandlerThread }  
{ 5 }  
constructor TClientHandlerThread.Create(AClientStream: TSocketStream);  
begin  
  inherited Create(false);  
  FreeOnTerminate := true;  
  FClientStream := AClientStream;  
end;  
{ 6 }  
procedure TClientHandlerThread.Execute;  
var  
  Msg : String;  
  Done: Boolean;  
begin  
  Done := false;  
  repeat  
    try  
      Msg := FClientStream.ReadAnsiString;  
      WriteLn(AddrToString(FClientStream.PeerAddress) + ': ' + Msg);  
    except  
      on e: EStreamError do begin  
        Done := true;  
      end;  
    end;  
  until Done;  
  WriteLn(AddrToString(FClientStream.PeerAddress) + ' disconnected');  
end;  
  
{ TTestServer }  
{ 7 }  
procedure TTestServer.TestOnConnect(Sender: TConnectionBasedSocket; AStream: TSocketStream);  
begin  
  WriteLn('Incoming connection from ' + AddrToString(AStream.PeerAddress));  
  TClientHandlerThread.Create(AStream);  
end;  
{ 8 }  
constructor TTestServer.Create(AOwner: TComponent);  
begin  
  inherited;  
  OnConnect := @TestOnConnect;  
end;  
  
{ main }  
{ 9 }  
var  
  ServerEventLoop: TEventLoop;  
begin  
  ServerEventLoop := TEventLoop.Create;  
  with TTestServer.Create(nil) do begin  
    EventLoop := ServerEventLoop;  
    Port := 12000;  
    WriteLn('Serving...');  
    Active := true;  
    EventLoop.Run;  
  end;  
  ServerEventLoop.Free;  
end.
{% endhighlight %}

- We will need each client to be handled in its own thread, so we need cthreads unit for *nix OSes
- The client handler thread, it would work on the given client socket stream
- The server, we will create an override constructor to hook when a client connects
- Helper routine to get ip:port as string
- Overriden constructor for the thread, will call the inherited constructor (with false argument to indicate the thread shouldn't be in suspended state), setting the object to free itself whenever the execution has finished, and assign the socket stream to a private attribute
- The core of the thread. Will try to read what the client sends and output it in the server log until the client disconnects
- OnConnect handler, prints notification message whenever a client connects and create a handler thread for it
- Overriden constructor for the server, assigns the OnConnect handler
- Main program. Create event loop object for the server, creates the server, assigning event loop and port to listen, and ready to accept connections...

For the client:


{% highlight pascal %}
	{$mode objfpc}{$H+}  
  
uses  
  Classes,SysUtils,Sockets,fpAsync,fpSock;  
  
var  
  ClientEventLoop: TEventLoop;  
begin  
  ClientEventLoop := TEventLoop.Create;  
  with TTCPClient.Create(nil) do begin  
    EventLoop := ClientEventLoop;  
    Host := '127.0.0.1';  
    Port := 12000;  
    Active := true;  
    EventLoop.Run;  
    Stream.WriteAnsiString('Hello');  
    Active := false;  
  end;  
  ClientEventLoop.Free;  
end.
{% endhighlight %}

Not numbered since it's only a single main code block. First it creates event loop for the client, create the client, assigning event loop, host and port of the server to connect, activate the connection, send a 'Hello' message to the server and disconnects.


