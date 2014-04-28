---
layout: post
title: "Find the slowest tests of a Java project"
category: posts
---

> Builds are never faster enough. Test coverage is never good enough.

I found that it's pretty hard to maintain a project with high coverage and
fast build... if it is slow, people will feel the need to skip the tests
them in the build, and will probably write less tests than them should, afraid
that the build will become slower. You go for a walk and when you come back
no one is running tests anymore...

It is well known that unit tests should be fast, but, what exactly is a unit
test? There are differences between unit tests and integration tests.
You probably know them already... a tl;dr will probably be something like this:

- **Unit tests** should guarantee that a small piece of code works, people
also writes unit tests while doing TDD. There is a boundary you should not
cross in you unit tests.

- **Integration tests** should test the integration between the different parts
of the software.

> You can easily found more about this in [Google][unit-vs-integration].

But let's talk about unit tests. Even better, let's talk about slow unit tests.

Ok, but what is a slow test? One can easily argue that
slow tests are a reflection of bad software design, because your classes
probably are highly coupled and have low cohesion. That's not always
the case though. Maybe is just the tests that are bad designed.

One smell of bad test is when your test don't follow the **AAA principle**.
**AAA** stands for Arrange Act Assert, which means that ideally a test should
first arrange its depedencies, than do something, and then assert something.
If your test have more arranges and acts after the assertion part, it should be
refactored in more tests. If you have to arrange too much things to test
something, probably what you are testing violates the high cohesion and
low coupling principle.

Anyway, I wrote a small script that you can use to found your slowest tests,
you can use it this way:

```bash
git clone https://gist.github.com/9420690.git slowest-tests
cd /project/folder
mvn clean install
path/to/slowest-tests/slowest_tests.sh /project/folder
# or
path/to/slowest-tests/slowest_tests_csv.sh /project/folder > top-tests.csv
```

You can see the code behind these scripts above.
<script src="https://gist.github.com/caarlos0/9420690.js"></script>

The TOP50 slowest tests of your project is, IMHO, a good place to start. Try
to optimize anything that takes more than 50ms (is a good value, I believe),
or made it an integration test. Integration tests usually are not ran as
much as unit tests.

[unit-vs-integration]: https://www.google.com.br/search?q=unit+tests+vs+integration+tests
[scripts]: https://gist.github.com/caarlos0/9420690
