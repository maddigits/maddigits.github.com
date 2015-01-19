---
layout: post
title: "Jekyll: Reading time without plugins"
---

Estimated reading time of a post is a feature that became popular, I believe,
with Medium.

There are plenty of Jekyll plugins that address this problem, but, if you
want to deploy at GitHub Pages, you can't use those plugins (GitHub will run
with the `--safe` flag).

So, I created a snipped of pure Liquid code to fix that.

So, the first thing we will want to do is get the word count. That's pretty,
actually:

{% highlight liquid %}
{% raw %}
{% assign words = content | number_of_words %}
{% endraw %}
{% endhighlight %}

Now, we need to divide this number with something. This something is called
_Word per minute_ (WPM). According to [Wikipedia][wpm], an average person
can read 180 words per minute in a computer monitor. Now it became really easy
to do the rest:

{% highlight liquid %}
{% raw %}
{{ words | divided_by:180 }} mins
{% endraw %}
{% endhighlight %}

But, what if the post has less than 180 words? Actually, even if it has more,
350 words, for instance, when divided by 180, will result in 1.94, Liquid will
round it down to 1, so, the user will see "1 mins", which is weird.
To fix that, we have to check if it has less than 360 words, because any
number great or equal 360 will result in 2+ mins, which still plural.

That said, the solution is quite simple:

{% highlight liquid %}
{% raw %}
{% if words < 360 %}
  1 min
{% else %}
  {{ words | divided_by:180 }} mins
{% endif %}{% endraw %}
{% endhighlight %}

So, to keep it organized, I put all this in a `read_time.html` in my `_includes`
folder:

{% highlight liquid %}
{% raw %}
<span class="reading-time" title="Estimated read time">
  {% assign words = content | number_of_words %}
  {% if words < 360 %}
    1 min
  {% else %}
    {{ words | divided_by:180 }} mins
  {% endif %}
</span>

{% endraw %}
{% endhighlight %}

And then I just `include` it in my `post` layout:

{% highlight liquid %}
{% raw %}
{% include read_time.html %}
{% endraw %}
{% endhighlight %}

And it works, as you can see here. Hope you like! :beers:

[wpm]: http://en.wikipedia.org/wiki/Words_per_minute
