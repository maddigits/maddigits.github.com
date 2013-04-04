---
layout: post
title: "Improving Vim and Gedit"
---

I just started to learn Ruby and Ruby on Rails, and, as I read somewhere, most Ruby/RoR developers don't like IDEs to do their work.

Curious, I tried to use some IDEs, like IntelliJ, Netbeans and others... and really, it just slow you.
A good text editor is incredibile better. For exempla, in my VIm config, I could simply type `def[TAB]` and VIm create for me:

{% highlight ruby %}
def method

end
{% endhighlight %}

with `method` already selected. So, I type the name, parameters, press `[TAB]` again, and I inside the method, then I just write it. It's really good. Also, gedit have the same functionallity, but, with the `[CTRL]+[SPACE]` combo.

## Gedit powered by GMate

GMate is a set of plugins that try to 'transform' gedit in a 'textmate for linux'.

The installation is pretty simple:

{% highlight sh %}
git clone git://github.com/gmate/gmate.git
cd gmate
./install.sh
{% endhighlight %}

Then close and open your gedit, go to settings, and take a look at themes and plugins. About themes, I **strongly** recomend *Molokai*. For me, this is the best theme ever.


## Vim powered by a gorgeus vimfiles setup

This '*vimfiles*' project is nothing more than a lot of plugins and some hacks in *vimrc* file, plus some themes, like Monokai (I already said thats the best theme ever!).

The installation is a little more complex than GMate, but, is not like build a Boing-747 :)

Just follow these steps:

1. Clone the project from github:

{% highlight sh %}
git clone git://github.com/caarlos0/vimfiles.git ~/.vim
{% endhighlight %}

1. Edit/Create your main `vimrc` file

{% highlight sh %}
vim ~/.vimrc
{% endhighlight %}

	With the the following content:

{% highlight sh %}
source ~/.vim/vimrc
colorscheme molokai
{% endhighlight %}

	Then save and exit;

1. Update the submodules:

{% highlight sh %}
cd ~/.vim
git submodule update --init
{% endhighlight %}

Done. Now, do your own tests and made your choice. I prefer VIm :)
