---
layout: post
title: "Twitter drops Ruby - The Bullshit"
category: posts
---

This post is about the twitter change from Ruby to Java, some years ago, fact
that, sadly, is still being used by some people to say that Ruby sucks and
Java is the best language in the world.

Before you read that, a little background on me would be good:

- Java is the first language I worked with. I started 4 years ago and
I'm still using it **every day**;
- No, I don't hate Java, it is just not my favorite language;
- I started with Ruby about 2 years ago;
- A lot of friends and coworkers try to troll me with that bullshit about
twitter and others.

Having that in mind, I decided to drop here some lines about this.

## Twitter dropped Ruby

Yeah, in the [original post][post] twitter says that they get 3x more
performance using Lucene and Java. The post is OK. The arguments are right.
Your interpretation may be wrong.

People like to generalize things. It's like "Twitter says they get more
performance with Java, so, Ruby sucks", which is not correct. If it was,
maybe you can also use PHP, since Facebook uses it and it work for them.

## Scalability isn't everything

Java is, in fact, more scalable than Ruby. And Erlang is more scalable than
Java. So if scalability is your only argument and concern, let's Erlang
everything.

![Erlang all the things](http://i.imgur.com/h1W5V8W.jpg)

Oh, are you talking about performance now? Why don't you write your
entire application in C using [raphters][raphters]?

Exactly: because of the **productivity**.

The fact is that Ruby and Java have different focuses in some points. Ruby
is way more focused in readability and productivity than Java, for example.
But this argument itself don't make one language better or worse than another.
They are just different.

## Twitter never said that Ruby sucks

Never. You could read that post how many times you want.

What happens is that a lot of republications about that post do.

Usually, they don't even know what they are talking about. They just link
that post, talk a lot of bullshit around the subject, and say something
pretentious, like, "thanks to java twitter handles U.S. elections", which
is also usually the tittle. ~~I'm very declined to believe that someone is
paying them to say that.~~

That's bullshit. Maybe, if they just stoped using MySQL and started using
Lucene and refactored their Ruby code - which they said in the post that was
with a huge technical debt - it would be fast enough. Maybe not. We can't be
sure about it based on presumptions.

## You don't have twitter's problems

You probably don't and probably will never have numbers even close to
twitter's. You probably don't have the same problems. The solutions that
work for twitter may not work for your application.

## Java != Java EE

Oracle, obviously, took advantage of this situation to promote their
technology, Java and Java Enterprise Edition.

The thing is that twitter don't use any JEE technology.
They implemented their own "platform", called Blender, using things like Thrift,
Netty and NIO, as they say in the post:

> Blender is a Thrift and HTTP service built on Netty, a highly-scalable NIO
> client server library written in Java that enables the development of a
> variety of protocol servers and clients quickly and easily.

JEE is heavy and have a lot of features that they will never use. Maybe for
an ERP it could make sense and work pretty well. But not for twitter, not
for everyone.

## Let's talk languages

So, what's the real concurrency problem in Ruby?

The main problem is that Ruby uses a Global Interpreter Lock (GIL), which
means that even if you use multiple threads, it will exist only one lock per
interpreter process. In other hand, Java have a very well tested and stable
concurrency model with one lock per thread.

![Ruby GIL](http://i.imgur.com/SnTf2hl.png)

The implications of Ruby's behavior is that if you want a 10 level concurrency,
you will need to start 10 application processes. Supposing that each
application instance uses around 200mb of memory, 10 x 200 = 2Gb~ (which is
indeed a lot of memory), while in Java it would probably use less, depending
on the application server.

The main problem is the memory usage. If you need something like 1k level
concurrency, you are screwed. But this is not the only problem. Since Ruby
have the GIL, if one thread locks it, the other threads running in that
interpreter instance still have to wait. This behavior **could** also lead
to a lot of CPU idle time.

The good part is that some Ruby application servers, like unicorn, rely on
unix process forking to achieve concurrency. Basically, it means that
instead of 10 processes with separate memories, the server "clones" the
process into 10. They share this part of memory, but can also modify its
own memories without affecting other forks.

You can also try jRuby, which have all the advantages of the JVM.

## What's the point?

The point is the same old subject that everyone keeps repeating but nobody is
listening: **There is no silver bullet**.

I like to see comparations between languages. I don't mind if I read
somewhere that "_[some lang I like]  [random feature]_ sucks",
since they have valid arguments.

I also don't mind if someone says that _[lang X]_ is better than _[lang y]_
in some matter, since they prove me their point.

Now, saying that "_[lang X] is better than [lang y] **because of
[z matter]**_" doesn't make any sense.

[post]: https://blog.twitter.com/2011/twitter-search-now-3x-faster
[raphters]: https://github.com/DanielWaterworth/Raphters

