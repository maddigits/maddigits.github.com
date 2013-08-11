---
layout: post
cover: "http://f.cl.ly/items/2Z3c2W3t113n1G0K1w2N/branches.png"
title: "Using git like a PRO"
---

Git has a lot of features, and I bet that 90% of who use it (including me)
doesn't know half of them. Well, maybe, someday, one of those _"unknown features"_
can _"save your life"_.

So, I decided to compile a small list of useful git commands, tips and tricks
that I use or used sometime in my work.

Of course, if you have yours tricks/tips (and you probably have), comment above
the post or ping me at twitter/mail/anything, I'll be glad to add your tip and
put your name in it.

Let's do this.

----------


### See who and in which commit each line of a file was changed last time

{% highlight bash %}
git blame path/to/file
{% endhighlight %}

### See the reference log

This will show the log of your local operations in the git tree, useful to get
revision code of a specific action (see next item).

{% highlight bash %}
git reflog
{% endhighlight %}

**HEADS UP**: `reflog` will only have the logs of actions in your local repository,
more specifically, it will log each time the `HEAD` pointer changes, so.


### Get revision code for anything

{% highlight bash %}
git rev-parse HEAD # last commit
git rev-parse HEAD~5 # 5 commits back from last commit
git rev-parse develop # last commit from develop branch
{% endhighlight %}

### Revert a specific file to a specific commit

{% highlight bash %}
git log path/to/file # to check the revision code
git checkout revision_code path/to/file
{% endhighlight %}

### Revert a specific file to last commit

{% highlight bash %}
git checkout HEAD path/to/file
{% endhighlight %}

### Revert a specific file to 3 commits back from last

{% highlight bash %}
git checkout HEAD~3 path/to/file
{% endhighlight %}

### Get an old version of some file

{% highlight bash %}
git show HEAD~3:path/to/file > path/to/file_3_commits_ago
{% endhighlight %}

### Shallow clone

According to the docs:

> Create a shallow clone with a history truncated to the specified number of
revisions. A shallow repository has a number of limitations (you cannot clone
or fetch from it, nor push from nor into it), but is adequate if you are only
interested in the recent history of a large project with a long history, and
would want to send in fixes as patches.

So, if you want only the last revision:

{% highlight bash %}
git clone https://github.com/twitter/bootstrap --depth 1
{% endhighlight %}

This can drastically reduce the clone. The bad thing is that you will have NO
HISTORY BEFORE THE HEAD WHEN YOU DO THE CLONE.

### Move a recent commit to another branch

This is pretty useful when you're working on something, commit, and them
realize that it would fit better in another branch (or that you're in the
wrong branch)... this is how to move it to another branch.

{% highlight bash %}
git branch new
git reset --hard HEAD~1 #go back 1 commit, YOU WILL LOST UNCOMMITED CHANGES
git checkout new
{% endhighlight %}

### Revert your entire tree to the last commit state
> by [@luizkowalski](https://github.com/luizkowalski)

Useful when you do some crap and want to throw it all away.

{% highlight bash %}
git reset --hard HEAD
{% endhighlight %}

You can also specify something like `HEAD~3` to get back 3 commits from HEAD.


### Remove files that have not been added to staging area
> by [@luizkowalski](https://github.com/luizkowalski)

{% highlight bash %}
git clean -df
{% endhighlight %}


### Stashing

> by [@thiagolenz](https://github.com/thiagolenz)

This is useful when you want to switch branches, but don't want to commit a
half-done work just to get back to it later.

{% highlight bash %}
git stash # save the current state
# later...
git stash pop # apply the stash to your current HEAD and remove it from your stack.
{% endhighlight %}

More info can be found [here](http://git-scm.com/book/en/Git-Tools-Stashing).

### Merge acting like it's an unique branch

> by [@thiagolenz](https://github.com/thiagolenz)

This will do the merge without creating the "merge commit", acting
much like SVN.

{% highlight bash %}
git pull --rebase
{% endhighlight %}

### Aliases

> by [@derekstavis](https://github.com/derekstavis)

You can setup aliases in git, so get smaller commands and save time. Examples:

{% highlight bash %}
# configuring...
git config --global alias.co checkout
git config --global alias.s status

# using
git s
git co https://github.com/caarlos0/up
{% endhighlight %}

### Copy a file from one branch to another

Useful if you want a file that was introduced or modified in other branch. Example:

{% highlight bash %}
git checkout gh-pages
git checkout master -- teste.js
git commit -m "Update test.js from master"
{% endhighlight %}

### Log deleted files

> by [Ricardo Walter](https://twitter.com/ricardo_walter)

Show the commit log with the deleted files for each commit:

{% highlight bash %}
git log --diff-filter=D --summary
{% endhighlight %}

### Delete a branch

Local:

{% highlight bash %}
git branch -d name
git branch -D name # force delete unmerged branch
{% endhighlight %}

Remote:

> by [Ricardo Walter](https://twitter.com/ricardo_walter)

{% highlight bash %}
git push origin :branchname
{% endhighlight %}

### Undo your last commit

> by [Endrigo Antonini](https://github.com/antonini)

If you do a wrong commit, revert it, but maintain the changes in your staging
area.

{% highlight bash %}
git reset --soft HEAD^
{% endhighlight %}

Just remember: `HEAD^` is a pointer to the parent of current `HEAD`, so, you
can use `HEAD~3` to go 3 commits back, for example. Also, check the `reflog`
part of this post.

### Remove a file from the last commit

PROTIP: Don't do this if you already pushed the commit.

For example, if you want to remove the `wrongfile.txt`, do:

{% highlight bash %}
git rm wrongfile.txt
git commit --amend
{% endhighlight %}

Done.


---

***Let's make this list bigger! Have your own tip/trick? Something I forgot to add?
Share it with us!***
