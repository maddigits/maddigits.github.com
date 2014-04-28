---
layout: page
title: Archive
redirect_from:
  - /archive
---

{% for post in site.posts %}
- [{{ post.title }}]({{ post.url }}) <small class="date">{{ post.date | date_to_string }}</small>
{% endfor %}
