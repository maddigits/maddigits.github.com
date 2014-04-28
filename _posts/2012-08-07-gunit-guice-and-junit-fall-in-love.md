---
layout: post
title: "GUnit - Guice and JUnit fall in love"
---

Yesterday, I wrote a [small article]({% post_url 2012-08-06-guice-and-junit %})
talking about Guice and JUnit, so, this time, I'll just say how to use the
small lib that I build (not big deal, one class, one annotation =] )

So, I dont push it to maven central yet, so, you will need to do some work to
made it work. Yep, you will need to build and install it to your local repo.

```bash
git clone git://github.com/caarlos0/gunit.git
cd gunit
mvn install
```

Now, just add it in your `pom.xml` dependencies:

```xml
<dependency>
	<groupId>com.github.caarlos0</groupId>
	<artifactId>gunit</artifactId>
	<version>1.0.0</version>
	<scope>test</scope>
</dependency>
```

And follow the instructions code example and the motivation of doing
this in [this article]({% post_url 2012-08-06-guice-and-junit %}), but,
basically, your tests will look like this:

```java
@RunWith(GuiceTestRunner.class)
@GuiceModules(FooModule.class)
public class FooTests {

	@Inject Bar bar;

	@Test
	public void testBar(){
	  assertTrue(bar.thisShouldReturnTrue());
	}
}
```

## [Get the code](git://github.com/caarlos0/gunit)

Pretty simple, yes?

Cheers.
