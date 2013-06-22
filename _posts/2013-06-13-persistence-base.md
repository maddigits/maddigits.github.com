---
layout: post
title: "persistence base"
category: posts
---

So, this is just another post (better, I hope) about my [persistence-base][1] project.
Ok, what is it? Basically, a "base" for your Java projects that will somehow need persistence.
It's baked by Guice, Guava, EclipseLink and Apache B-Val, so, you shall have everything
you need to get started almost instantly.

### How to Use

Create a new Maven project and add the following to your `pom.xml`:

{% highlight xml %}
<dependencies>
  <dependency>
    <groupId>com.github.caarlos0</groupId>
    <version>0.0.5</version>
    <artifactId>persistence-base</artifactId>
  </dependency>
</dependencies>
<repositories>
  <repository>
    <id>caarlos0-releases</id>
    <url>https://github.com/caarlos0/maven/raw/master/releases</url>
  </repository>
</repositories>
{% endhighlight %}

Nice, you now have all needed dependencies (Guava, EclipseLink, Guice, etc). In
fact, if you run `mvn dependency:tree`, you will get something like:

    [INFO] com.carlosbecker:persistence-base-example:jar:1.0-SNAPSHOT
    [INFO] \- com.github.caarlos0:persistence-base:jar:0.0.5:compile
    [INFO]    +- javax.validation:validation-api:jar:1.0.0.GA:compile
    [INFO]    +- org.eclipse.persistence:javax.persistence:jar:2.0.3:compile
    [INFO]    +- org.eclipse.persistence:eclipselink:jar:2.4.0:compile
    [INFO]    |  \- commonj.sdo:commonj.sdo:jar:2.1.1.v201112051852:compile
    [INFO]    +- org.glassfish.external:commons-codec-repackaged:jar:3.0:compile
    [INFO]    +- org.apache.bval:bval-core:jar:0.5:compile
    [INFO]    |  +- org.apache.commons:commons-lang3:jar:3.1:compile
    [INFO]    |  \- commons-beanutils:commons-beanutils-core:jar:1.8.3:compile
    [INFO]    +- org.apache.bval:bval-jsr303:jar:0.5:compile
    [INFO]    +- com.google.inject:guice:jar:3.0:compile
    [INFO]    |  +- javax.inject:javax.inject:jar:1:compile
    [INFO]    |  \- aopalliance:aopalliance:jar:1.0:compile
    [INFO]    +- com.google.inject.extensions:guice-persist:jar:3.0:compile
    [INFO]    \- com.google.guava:guava:jar:14.0.1:compile

Then, you can start doing your code. Let's build a small example.

## Example

### Create a model

I will create a simple model called `Person`, with `firstname` and `lastname`
attributes, and to demonstrate some Guava functionalities, I'll also build a way
to get and set a virtual `fullname` attribute.

The code:

#### Person.java

{% highlight java %}
package com.carlosbecker.models;

import java.util.Iterator;

import com.carlosbecker.utils.StringUtils;
import com.github.caarlos0.model.Bean;

public class Person extends Bean {
  private static final long serialVersionUID = 1L;

  private String firstname;
  private String lastname;

  public Person() {
  }

  public Person(String fullname) {
    setName(fullname);
  }

  public Person(String firstname, String surname) {
    this.firstname = firstname;
    this.lastname = surname;
  }

  public String getName() {
    return StringUtils.join(firstname, lastname);
  }

  public void setName(String fullname) {
    Iterator<String> it = StringUtils.splitOnSpace(fullname).iterator();
    if (!it.hasNext()) {
      return;
    }
    this.firstname = it.next();
    this.lastname = StringUtils.joinIterator(it);
  }

  public void setFirstname(String firstname) {
    this.firstname = firstname;
  }

  public void setLastname(String surname) {
    this.lastname = surname;
  }

  public String getFirstname() {
    return firstname;
  }

  public String getLastname() {
    return lastname;
  }
}

{% endhighlight %}

My `StringUtils` class looks like this:

#### StringUtils.java
{% highlight java %}
package com.carlosbecker.utils;

import com.google.common.base.Joiner;
import com.google.common.base.Splitter;
import java.util.Iterator;

public class StringUtils {

    public static String joinIterator(Iterator<String> it) {
        StringBuilder sb = new StringBuilder();
        while (it.hasNext()) {
            sb.append(it.next()).append(" ");
        }
        return sb.toString().trim();
    }

    public static Iterable<String> splitOnSpace(String str) {
        return Splitter.on(" ").split(str);
    }

    public static String join(String... strings) {
      return Joiner.on(" ").skipNulls().join(strings).trim();
    }

}
{% endhighlight %}


#### MainModule.java
{% highlight java %}
package com.carlosbecker.inject;

import com.carlosbecker.models.Person;
import com.github.caarlos0.inject.AbstractPersistentModule;
import com.github.caarlos0.inject.PersistenceModule;

public class MainModule extends AbstractPersistentModule {

  @Override
  protected void configure() {
    install(new PersistenceModule("example"));

    bindGenericDaoFor(Person.class);
  }

}
{% endhighlight %}
