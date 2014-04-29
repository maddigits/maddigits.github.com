---
layout: post
title: "Find the slowest tests of a Java project"
---

> Builds are never faster enough. Test coverage is never good enough.

I found that it's pretty hard to maintain a project with high coverage and
fast build... if it is slow, people will feel the need to skip the tests
to speed up the build, and will probably write less tests than they should,
afraid that the build will became slower. You go for a walk and when you come
back no one is running tests anymore...

One way to avoid that is to track down the tests that are slow and fix them.
The less dependencies your test have, the fast it will run. Just saying.

I wrote a [small script](https://gist.github.com/caarlos0/9420690) to generate
a list of the slowest JUnit tests. It should give you some direction in
where to attack.

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

That's it for today, happy hacking!

[unit-vs-integration]: https://www.google.com.br/search?q=unit+tests+vs+integration+tests
[scripts]: https://gist.github.com/caarlos0/9420690
