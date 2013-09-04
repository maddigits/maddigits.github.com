---
layout: post
title: "Javascript Variable Hoisting"
category: posts
---

> This is article is the second of a serie of `n` articles, where `n` could
> be any given number between `1` and `2` (inclusive).

The first article of this serie was about [Contexts]({% post_url 2013-08-12-js-context %}).
The article itself received much more attention than I thought it will, which leads me
to proceed and create the next very basic JavaScript articles.

So let's do this.

## Variable Hoisting

> **hoist** - _noun_
>
> 1. An apparatus for lifting heavy or cumbersome objects.
>
> 2. The act of hoisting; a lift.
>
> From [The Free Dictionary](http://www.thefreedictionary.com/hoist)

To explain what it means in JavaScript code, let's do some examples:

{% highlight javascript %}
var msg = "Hello";

(function () {
  alert(msg);
})();
{% endhighlight %}

I believe that it's pretty obvious for everyone here that it will
alert "Hello". Nice, but what happens now?

{% highlight javascript %}
var msg = "Hello";

(function () {
  alert(msg);
  var msg = "Bump";
})();
{% endhighlight %}

You might be thinking that it would do the same as the previous function,
or, maybe, that it will alert "Bump". Well, both answers are wrong. It will
actually alert a big and nice `undefined` ~~in your face~~.
Now you yield "dafuq?".

So, what just happened here? Simple. **The variable declaration was hoisted**.
However, if you try something like this instead:

{% highlight javascript %}
var msg = "Hello";

(function () {
  alert(msg);
  msg = "Bump";
})();
{% endhighlight %}

You will see that it works. I'll keep you from all the context explanation
again, just read my previous post, but, in the `msg = "Bump"` line you're
not declaring a new variable (you didn't use the `var` keyword), so, it
will try to change the outer function (which in this case is `window`)
`msg` variable.

In the `undefined` alert example, we are using the `var` keyword, which means
that we are creating a new variable with the same name of the variable of the
outer scope (`window`). But, again, **JavaScript hoists variable declarations**,
so, the previous code will actually be interpreted like this:

{% highlight javascript %}
var msg = "Hello";

(function () {
  var msg;
  alert(msg);
  msg = "Bump";
})();
{% endhighlight %}

So, obviously, in the point where alert is executed, the `msg` variable is,
indeed, `undefined`. The same _hoisting_ effect happens when you do code like:

{% highlight javascript %}
var a = 1;
var b = 2;
var c = 10;
var x = 23432;
{% endhighlight %}

A code like that will actually be interpreted like:

{% highlight javascript %}
var a, b, c, x;
a = 1;
b = 2;
c = 10;
x = 23432;
{% endhighlight %}

## Avoiding Variable Hoisting Issues

There is no such thing in JavaScript. You can't prevent the hoisting, what you
can - and **should** - do is "manually hoist" your variables. It will make
your code far less confusing and  will help you and other people that may
someday have to maintain it to debug an error or add new features.

I would like to, again, recommend this excellent book by Douglas Crockford,
"[JavaScript: The Good Parts][book]". It will surely help you to
understand JavaScript and avoid a lot of commom errors.

[book]:http://amzn.to/14ZmSmZ

Happy Coding!

