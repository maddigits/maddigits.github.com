---
layout: post
title: "Find the slowest tests of a Java project"
---

I found that it's pretty hard to have a project with high test coverage and
fast build... if the tests are slow, people will feel the need to skip them
to speed up the build, and will probably write less tests than they should,
afraid that the build will became even slower. You go out for a walk and when
you come back no one is running or writing tests anymore...

One way to avoid that is to track down the slowest tests and fix them.
The less dependencies your test have, the fast it will run. Just saying.

Paraphrasing Uncle Bob:

> "The first rule about tests is that they should be
> fast. The second rule about tests is that they should be faster than that."

** Actually he said that about method sizing, but, I think this fits just fine.

To help with that, I wrote a [small script](https://gist.github.com/caarlos0/9420690)
to generate a list of the slowest JUnit tests. It should give you some
direction in where to attack. The script is pretty simple, but it does the job.

```bash
git clone https://gist.github.com/9420690.git scripts
scripts/slowest-tests project/folder
```

You can also generate that list in CSV format by running:

```bash
scripts/csv-slowest-tests project/folder
```

More than that, you can use [maven-profiler](https://github.com/takari/maven-profiler)
to find other slow parts of your build and fix them.

One last tip: if are having problems with low test coverage in your project,
try [coverage-maven-plugin]({% post_url 2014-03-18-mvn-pr-coverage-blammer %}),
a maven plugin that will blame pull request with coverage bellow a specified
amount.

That's it for today, happy hacking!

[unit-vs-integration]: https://www.google.com.br/search?q=unit+tests+vs+integration+tests
[scripts]: https://gist.github.com/caarlos0/9420690
