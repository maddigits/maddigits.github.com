---
layout: post
title: "Rocking out with Google Guava"
---

According to the [project site on Google Code](http://code.google.com/p/guava-libraries/), *The Guava project contains several of Google's core libraries that we rely on in our Java-based projects: collections, caching, primitives support, concurrency libraries, common annotations, string processing, I/O, and so forth*.

I'll show you some cool features that could make you like Guava Libraries even more:

* [Multimaps](http://guava-libraries.googlecode.com/svn/tags/release09/javadoc/com/google/common/collect/Multimap.html) - I'm pretty sure that at least one time in you life you have needed a `Map<Foo, Collection<Bar>>` or something similar, huh? If not, someday you will need it, and when you need, you will see the crap that is doing a lot of checks for a existing collection with some key and creating and adding it if it isn't there.
* [Ordering](http://code.google.com/p/guava-libraries/wiki/OrderingExplained) - Basically, a *fluent* comparator class, with a lot of utilities... you will be surprised when you see how cow it is, and will ask yourself *how could I live without it until now?*, you can bet.
* `Objects#equal` - A null safe equals method. Never write `if(foo != null && bar != null && foo.equals(bar))` in your life again. BTW, take a look in all [Object commom methods](https://code.google.com/p/guava-libraries/wiki/CommonObjectUtilitiesExplained), you can use `Objects#firstNonNull(Object, Object)`, as example, while elvis operator and Java 8 are not ready :)
* [@Nullable and other utilities](https://code.google.com/p/guava-libraries/wiki/UsingAndAvoidingNullExplained) to help you follow the [Null Object Pattern](http://en.wikipedia.org/wiki/Null_Object_pattern#Java).
* [IO Handling](https://code.google.com/p/guava-libraries/wiki/IOExplained), the `Files` class e.g..
	Want to read the lines of a text file? Are you opening a BufferedReader? Don't do that:

```java
Collection<String> lines = Files.readLines(mytxtFile, Charsets.UTF8);
```

Simple, uh?

* [Splitters](https://code.google.com/p/guava-libraries/wiki/StringsExplained#Splitter) and [Joinners](https://code.google.com/p/guava-libraries/wiki/StringsExplained#Joiner) - Suppose that our text filed used in the other example contains a lot of columns divided by a pipe (`|`), now, how can we parse it? Simple! Iterate the collection of string provided by `Files.readLines`, and do something like:

```java
Iterable<String> columns = Splitter.on('|').trimResults().omitEmptyStrings().split(line);
```
Pretty easy :)

* [Preconditions](https://code.google.com/p/guava-libraries/wiki/PreconditionsExplained) plus a `static import` made your arguments, state and null check easy and clean, throwing the respective exceptions (`IllegalStateException`, `IllegalArgumentException`, `NullPointerException`, etc...).
* [Immutable collections](https://code.google.com/p/guava-libraries/wiki/ImmutableCollectionsExplained) types (Immutable Maps, Lists, Sets, etc...).
* [CharMatcher](https://code.google.com/p/guava-libraries/wiki/StringsExplained#CharMatcher) - pretty easy way to match characteres sequences, eg:

```java
String phoneNumber = CharMatcher.DIGIT.retainFrom("my phone number is 123456789");
CharMatcher.inRange('a','z').or(inRange('A','Z'));
```

* There is also [Functional](https://code.google.com/p/guava-libraries/wiki/FunctionalExplained) classes, maybe you will want to use them.
* [EventBus](https://code.google.com/p/guava-libraries/wiki/EventBusExplained) - Basically, a better EventListener.
* [Caching](https://code.google.com/p/guava-libraries/wiki/CachesExplained) - Made your app more fast.

These are, IMHO, the best features in Guava. But, [there is much more](https://code.google.com/p/guava-libraries/wiki).

If you want to use it in a maven project, just add to your `pom.xml`:

```xml
<dependency>
	<groupId>com.google.guava</groupId>
	<artifactId>guava</artifactId>
	<version>13.0</version>
</dependency>
```

If you are not using maven, you can download the last version in [this page](https://code.google.com/p/guava-libraries/).


## Cool links

* [A question in stackoverflow](http://stackoverflow.com/questions/3759440/the-guava-library-for-java-what-are-its-most-useful-and-or-hidden-features#_=_), talking about some Guava Features;
* [Some PDF's](https://code.google.com/p/guava-libraries/downloads/list), mostly is from talks somewhere by someone, good stuff.

The project still active, the last release (13) is from August 3, 2012.

That's all. Cheers.
