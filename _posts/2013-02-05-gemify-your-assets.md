---
layout: post
title: "Gemify your assets"
category: posts
---

Rails 3.1 introduced the asset pipeline, which make it easy to include versioned
external assets as application dependencies.

![Gem](http://kavassalis.com/wp-content/uploads/2013/01/100px-Ruby_logo.png)

Probably you will find almost any JS library you want, already _Gemified_,
but, if it is not the case, you can _Gemify_ those libraries by your own, and I
can help you with it. So, let's do it!

## 1. Create the project skeleton

Bundler makes it simple to create the files and folders necessary for for
building a Gem:

{% highlight sh %}
bundle gem somelibrary
{% endhighlight %}

This command will create basically the following tree:


    somelibrary
    ├── Gemfile
    ├── lib
    │   ├── somelibrary
    │   │   └── version.rb
    │   └── somelibrary.rb
    ├── LICENSE.txt
    ├── Rakefile
    ├── README.md
    └── somelibrary.gemspec


But, I usually made some changes to it:

##### 1. Delete the `version.rb` file and it's parent folder:

{% highlight sh %}
rm -rf lib/somelibrary
{% endhighlight %}

> **Heads up:** Don't forget to change the `lib/someligrary.rb` and
`somelibrary.gemspec` files!


##### 2. As I said in item 1, change the `somelibrary.gemspec` file...

Remove the references to `version.rb`, put a static version, replace the TODO's
by your own texts.

##### 3. As I said in item 1, change the `lib/somelibrary.rb` file...

You had to force it to load the rails engine:

{% highlight ruby %}
module Somelibrary
    class Engine < ::Rails::Engine
    end
end
{% endhighlight %}

## 2. Create the `vendor/assets` folder

That's easy!

{% highlight sh %}
mkdir -p vendor/assets/{javascripts,stylesheets}
{% endhighlight %}

## 3. Copy the assets to the folders

Even easier, just copy the respective `js` and `css` files to `javascripts`
and `stylesheets` folders, respectively.

## 4. Test

Now, create some rails app, and add the following to the Gemfile:

gem 'somelibrary', path: 'absolute/path/to/your/gem'

And, off course, add the respective imports in your `application.js` and
`application.css` files.

## 5. Document

Yeah, users would like some documentation and a few appointments about how to
use your Gem. So, please, **do it**.

## 6. Release

Well, now that the Gem is crafted, tested and documented, we could finally
release it.

Create a github repository for your gem, and do the basics:

{% highlight sh %}
git init
git add -A
git commit -m 'first'
git remote add https://github.com/USER/REPO
git push origin master
{% endhighlight %}

And then, finally, release it using Rake:

{% highlight sh %}
rake release
{% endhighlight %}

This will create a tag for the version specified in your gemspec, push it to
github and to rubygems.org.

Simple, uh?

## 7. Enjoy

Now, just use it as a normal gem :)

Hope you enjoyed the post.

Cheers
