---
layout: post
title: "Ruby for Java Developers"
category: posts
---

> **Disclaimer**:
>
> - The goal of this article is to teach basic differences
> between Ruby and Java. You can find most of these information searching
> in stackoverflow and Google, I just wanted to _merge_ it all in a
> single page;
>
> - The examples and explanations are all based on Ruby 2.0.0 MRI.

## Language fundamentals

Just like Java, in Ruby  the memory is managed for you via a Garbage Collector,
objects are strongly typed, there are `public`, `private` and `protected`
modifiers. There are also embedded doc tools like Javadoc, in Ruby, called RDoc.

Unlike Java, Ruby is interpreted, which means you don't need to compile your
code. There are also several GUI toolkits for Ruby, like WxRuby, FxRuby and
others, including a bundled-in called Ruby Tk.

In most of places, you use the keyword `end` to close a block instead of braces.
You also have to `require` instead of `import`. Parentheses in method calls are
optional. All member variables are private. There is no static type checking.
Variables are just labels, they just don't have a type associated with them.
For example, the following two examples are equivalent:

{% highlight java %}
// java
int[] a = {1, 2, 3, 4, 5}
{% endhighlight %}

{% highlight ruby %}
# ruby
a = [1, 2, 3, 4, 5]
{% endhighlight %}


There is also no casting. Due to Duck Typing, if an object respond to the
method you are calling, it will just work. The class instantiation are like
`Person.new` instead of `new Person()`. The constructor is always named
`initialize` instead of the name of the class.

You will also use mixins instead of interfaces. YAML tends to be favored over
XML. It's `nil` instead of `null` (as you will see in next chapters). The
`equal?`/`equals` and `==` operators have different behaviors in Ruby and Java.
Basically, Java's `equals` have the same behavior as Ruby `==`, and Java's `==`
is the same as Ruby `equal?`.

## OOP basics

First of all, [Java is not a purely object oriented language][not-purely-oop],
basically, because of primitives. For instance:

{% highlight java %}
// java
new Integer(10).toString(); // works
10.toString(); // nope
{% endhighlight %}

However, you can set the value of an `int` type to an `Integer` value.
This works due to the JVM [autoboxing][autoboxing] (talk more about this later).

Moreover, Ruby is a pure OOP language, considering the fact that everything is
an object. `true` and `false` are objects, `nil` is an object, any given number
is an object, methods are objects, well, I already said, **everything**.

It basically means that you can do things like:

{% highlight ruby %}
# ruby
2.to_s # works
2.class # Fixnum
10.times { puts 'str' } # prints str 10 times
{% endhighlight %}

This means that Ruby doesn't need any type of autoboxing. Basically,
in Ruby, all things have a common ancestor, the `Object` class.
Remember, **everything is an object**.

[pure-oop]: http://www.ruby-lang.org/en/about/
[not-purely-oop]: http://stackoverflow.com/questions/6151497/why-java-is-not-pure-object-oriented-language
[autoboxing]: https://www.google.com.br/search?q=java+autoboxing


## Syntax basics

Java and Ruby syntaxes differ a lot. While Java is extremelly verbose, Ruby
abuses of tons of syntatic sugar mechanisms to make it looks the less
verbose and clean as possible. In the next items, I'll try to demonstrate de
very basics of the Ruby syntax.

### Variable declarations

First, let's clarify some definitions:

1. **static typing** is a mechanism where the type of a variable is resolved in
advance by the interpreter/compiler;
1. **dynamic typing** is a mechanism where the type of a variable can change and
be resolved on the fly;
- **strong typing** means that the compiler wont let you "mix" typed. i.e.,
`2 + "asd"` will not compile;
- **weak typing** is basically the opposite of the strong typing.

Having that in mind, let's resume:

- Java have **static** and **strong** typing;
- Ruby have **dynamic** and **strong** typing.

In Ruby, the syntax to declare variables is simple as defining its name:

{% highlight ruby %}
# ruby
person = Person.new
number = 23
something = 'a string'
something = 123
something = Time.now
{% endhighlight %}

#### Instance Variables

Instance variables are exactly what the name says. You can only access them
with a instance of the class.

{% highlight ruby %}
# ruby
class Person
  attr_accessor :age
  @age
end

Person.age # NoMethodError
p = Person.new
p.age # nil
p.age = 20
p.age # 20
{% endhighlight %}

They are pretty much like a private variable in Java. The `attr_accessor`
method call (yes, it's a method) define the attributes which should have
getter and setters. When you do `p.age = 20`, you're actually calling the
`age` setter, which is defined like this under the hoods:

{% highlight ruby %}
# ruby
class Person
  attr_accessor :age
  @age

  # getter
  def age
    @age
  end

  # setter
  def age=(age)
    @age = age
  end
end
{% endhighlight %}

#### Class Variables

Ruby's class variables are much likely a Java static variable.

{% highlight ruby %}
# ruby
class Polygon
  @@corners = 10

  def self.corners
    @@corners
  end
end

class Square < Polygon
  @@corners = 4
end

class Triangle < Polygon
  @@corners = 3
end

Square.corners # 4
Triangle.corners # 3

# now pay attention:
Polygon.corners # 3
{% endhighlight %}

Why the heck `Polygon.corners` is now 3 instead of the original 10?
Ruby interpreter see that you are setting the `corners` inside the subclasses,
but, it actually sets the value to the superclass too.

### Conditionals

The `if` syntax is very similar to Java's `if`. The differences is the lack
of parentheses, the `end` keyword to "close" the statement and the `elsif`
statement instead of Java's `else if`.

{% highlight ruby %}
# ruby
if condition
  puts 'condition true'
end

if condition
  puts 'condition true'
else
  puts 'condition false'
end

if condition
  puts 'condition true'
elsif another_condition
  puts 'another_condition true'
else
  puts 'another_condition and condition false'
end
{% endhighlight %}

You will never need to do a code like this in Ruby:

{% highlight java %}
// java
if (!condition) {
    System.out.println("condition false");
}
{% endhighlight %}

In these cases, Ruby have the `unless` statement, which can be used like the
the following example:

{% highlight ruby %}
# ruby
unless condition
  puts 'condition false'
end
{% endhighlight %}

Also, you can simplify these examples using inline conditionals:

{% highlight ruby %}
# ruby
puts 'condition fase' unless condition
puts 'condition true' if condition
if condition then puts 'condition true' end
{% endhighlight %}

### Loops

In Ruby we have basically the same loops as in Java, but with slightly syntax
variations and also some aditional loops and methods. Let's start with the
basic `while` loop:

{% highlight ruby %}
# ruby
cities = ['Joinville', 'Medianeira', 'Marechal Candido Rondon']

i = 0
while cities[i]
  puts cities[i]
  i += 1
end

# or
i = -1
puts cities[i += 1] while cities[i]
{% endhighlight %}

We also have an `until` loop:

{% highlight ruby %}
# ruby
days = 10
until days == 0
  puts "nope #{days -= 1}"
end

# or
days = 10
puts "nope #{days -= 1}" until days == 0
{% endhighlight %}

We obviously have also a `for` and a `for-each` loop:

{% highlight ruby %}
# ruby
cities = ['Joinville', 'Medianeira', 'Marechal Candido Rondon']

for city in cities
  puts city
end
{% endhighlight %}

You can also iterate hashes, which are much like Java Maps:

{% highlight ruby %}
# ruby
states_and_cities = {sc: ['Joinville'], pr: ['Medianeira', 'Marechal Candido Rondon']}

for state, cities in states_and_cities
  puts "state '#{state}' has cities '#{cities.join(', ')}'"
end
{% endhighlight %}

Also, in Ruby, the `Array` class extends the `Enumerable` class:

{% highlight ruby %}
# ruby
puts Array.ancestors
# [Array, Enumerable, Object, Kernel, BasicObject]
{% endhighlight %}

If you look at the [Enumerator RDoc][enumerator-rdoc], you will see tons of
nice and useful methods, including `each` and `each_with_index`, for example.


{% highlight ruby %}
# ruby
classes = Array.ancestors

classes.each do |clazz|
  puts "Array < #{clazz}"
end

# or..
classes.each { |clazz| puts "Array < #{clazz}" }

# or, supposing you need the index..
classes.each_with_index do |clazz, index|
  puts "#{index}: Array < #{clazz}"
end
{% endhighlight %}

This feature used in `each` (and in a lot of other methods) is called `block`.
We will talk about it further.

[enumerator-rdoc]: http://ruby-doc.org/core-2.0/Enumerator.html#method-i-each

### Conventions

As you might have noticed, in Ruby, we don't need to end each line with a `;`,
except if you want to put two commands in a single line. Also, you can use
both `'` or `"` around strings. Maybe you also noticied that I used two-space
tabs instead of four. In this chapter we will discuss these things.

The principal things about style that you should take care are:

- always use UTF-8 (default in Ruby 2.0.0+);
- use **two spaces** per identation level. See, **spaces**, not hard tabs;
- use unix-style line endings;
- 80 column is more than enough. Respect.

About naming, the principal rules are:

- name identifiers always in english;
- `snake_case` for identifiers, methods, symbols and file names;
- `CamelCase` for classes and modules;
- `SCREAMING_SNAKE_CASE` for constants;
- for strings, preffer single quotes, unless you are doing some interpolation;
- Predicate methods (which return boolean values) should always end with a `?`,
like in `Array.empty?`. It's pretty much like if your asking for tha array:
"Are you empty?";
- Append a bang (`!`) to the methods which do something "dangerous", for
example, change the `self` object or exit.

These are the very basic of the naming and language conventions. You should
read the [complete ruby-style-guide][ruby-style-guide] for further information.

[ruby-style-guide]: https://github.com/bbatsov/ruby-style-guide

### Strings

In Ruby 2.0.0+ the strings are UTF-8 by default. You can declare string with
simple and double quotes, as well multi-lined strings with triple double quotes:

{% highlight ruby %}
# ruby
str1 = 'string 1'
str2 = "string with interpolation of #{str1}"
str3 = """
multi
lined
string
with
interpolation
of
#{str1}
and
#{str2}
"""
{% endhighlight %}

Besides that, it's pretty much the same as Java. Some method names will differ.
I **strongly** recommend you to take a look at [String RDoc][string-rdoc]
tought.

[string-rdoc]: http://ruby-doc.org/core-2.0/String.html

### Symbols

### Blocks

### Arrays

### Maps

## `nil` vs `null`

In Java we're used to treat `null` as a special value or even a keyword. In
Java, `null` holds a value which no valid point will ever refer to. So, we
usually do comparations like this:

{% highlight java %}
// java
if (person != null) {
    person.walk();
}
{% endhighlight %}

Well, we have to check if if the object really exists, i.e., if it points to
something that isn't `null`. Invoking methods in a `null` object will throw the
commonly see `NullPointerException`.

In Ruby, there is also a way to check if an object is `null`:

{% highlight ruby %}
# ruby
unless person.nil?
  person.walk
end
# or even
peron.walk unless person.nil?
{% endhighlight %}

The heck?! We just invoked a method in a possibly `nil` object?
Yeap. That is possible due to a really neat implementation of the
[Null Object Pattern][null]. Basically and grossly, instead of
having a `null` reference to convey absence of an object (like our
non-existent `person` object), the language uses an object with some
useful methods, but no real behavior (for example, Ruby will not automagically
create a `NilPersonClass` with all your method signatures with no
implementation).

Actually, `nil` is a singleton instance of the `NilClass`[1][NilClass], and, as
you can see, this class extends `Object` and both of them implements the method
`nil?`, while only the `NilClass` implementation of `nil?` return true.

{% highlight ruby %}
nil.class # NilClass
10.nil? # false
nil.nil? # true
nil == nil # true
{% endhighlight %}

Also following a similar behavior, we have the `true` and `false` statements,
which are singleton instances of `TrueClass` and `FalseClass` respectively.

[null]: http://en.wikipedia.org/wiki/Null_Object_pattern
[NilClass]: http://www.ruby-doc.org/core-2.0/NilClass.html


# More OOP

## Classes

## Interface vs Mixins

## Modules



{% highlight java %}

{% endhighlight %}

{% highlight ruby %}

{% endhighlight %}

## VM

### GC

#### Copy-on-Write

## Concurrency

### Threads, Fibers and GIL

### Forks and the relation with GC and CoW

### Actor Model

http://adit.io/posts/2013-05-15-Locks,-Actors,-And-STM-In-Pictures.html#software-transactional-memory

http://blog.marc-andre.ca/2013/02/23/ruby-2-by-example/
