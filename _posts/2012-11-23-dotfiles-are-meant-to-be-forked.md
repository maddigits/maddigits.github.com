---
layout: post
title: "Dotfiles Are Meant to Be Forked"
---

Well, it been a while since I replaced my old but gold bash by the greatest zsh.
I do also use vim for more time that I can remember, but, last days I'm using
SublimeText most of time. 

Anyway, I have my personal computer and my job computer, and, like every developer,
I create aliases and scripts for everything I think I could use a lot of times.

![Automate all the things!](http://www.anchor.com.au/blog/wp-content/uploads/2011/08/automate-all-the-things1.png)

Well... you can imagine.. my bashrc had about 300 lines. It was really big. Almost impossible
to share with other. Bloated. etc...

Then, I just make a huge step in my life: move to [ZSH][zsh]!

## ZSH

According to [Arch Wiki about ZSH][arch_zsh_wiki], _"Zsh is a powerful shell that
operates as both an interactive shell and as a scripting language interpreter.
While being compatible with Bash (not by default, only if you issue "emulate sh"),
it offers many advantages such as: Faster, Improved tab completion, Improved globbing,
Improved array handling, Fully customisable"_.

But, well, I didn't know where to start. So, I forked [oh-my-zsh][ohmyzsh] project.
I use it for a while, also did a contribution that troll everyone (that's another
story), but well, it has so many thing I didn't use, and doesn't had a simple
way to share config files across computeres.

Then I see [holman's dotfiles](http://github.com/holman/dotfiles) and it was perfect!
Except for the fact that it was full of Mac OSX-related things.

So I tweaked, removed, tweaked, cleaned-up, tweaked, etc etc, and there it is, my all-new
[dotfiles][dotfiles]!

## so get it, bro

It has some dependencis, basically:

- rbenv
- ruby 1.9+

So, just follow the [readme][readme] (pretty simple), and, well, it should be working.

If you change something, you'll not see the changes unless you open a new terminal window
or call `reload!`.

Some cool aliases:

- `h` is your `~/` folder;
- `c` is your `~/code` (change it in `.zshrc` file);
- `d` is the `~/.dotfiles` folder

You can run a `alias` to see all avaliable aliases. But, well, take a look inside the folder,
there is a lot of standalone binaries too!

If you want, you can also read the [holman's post about his dotfiles](http://zachholman.com/2010/08/dotfiles-are-meant-to-be-forked/).

If you wanna contribute with anything, made a ass-kicker pull-request. I'll be glad to see it!

That's all folks, hope see you soon!

[dotfiles]: http://github.com/caarlos0/dotfiles
[readme]: https://github.com/caarlos0/dotfiles#install
[zsh]: http://www.zsh.org/
[arch_zsh_wiki]: https://wiki.archlinux.org/index.php/Zsh
