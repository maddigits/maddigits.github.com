---
layout: page
title:
tagline: 
---
{% include JB/setup %}

<ul class="unstyled">
    {% for post in site.posts limit 10 %}
        <li>
            <h1>
                <a class="post-title" href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
                <small>{{ post.date | date_to_string }}</small> 
            </h1>
            <div class="well">
                {{ post.content | strip_html | truncatewords:75 }}
                <p />
                <h6><a href="{{ post.url }}">&raquo; Read more...</a></h6>
            </div>
        </li>
    {% endfor %}
</ul>


