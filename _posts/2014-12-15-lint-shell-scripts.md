---
layout: post
title: "Lint your shell scripts"
---

I will start this by quoting the [bashstyle][bashstyle]'s readme:

> Bash is like the JavaScript of systems programming. Although in some cases
> it's better to use a systems language like C or Go, Bash is actually an ideal
> systems language for many smaller POSIX-oriented or command line tasks.
> Here's three quick reasons why:
>
> - It's everywhere. Like JavaScript for the web, Bash is already there ready
> for systems programming.
> - It's neutral. Unlike Ruby, Python, JavaScript, or PHP, Bash offends equally
> across all communities. ;)
> - It's made to be glue. Write complex parts in C or Go (or whatever!), and
> glue them together with Bash.

My concern about that is the quality of the code itself. Like JavaScript,
most people will just google and do what they want in the first way that they
found - _quick and dirty_. You can blame me too.

So, projects like [bashstyle][bashstyle] are important to set a common sense
in how to do things using bash. The problem is that it's not automated.

A project that really helps with that is [shellcheck][shellcheck]. It's an
executable written in Haskell, which can lint your scripts (in bash, zsh, and
others). Sure enough, we can put this in a Countinuous Integration system and
watch it do the validation for us.

An simple example of `build.sh` script is:

```bash
#!/bin/bash
set -eo pipefail
[[ "${DEBUG:-}" ]] && set -x

main() {
  find . -type f -perm +111 | grep -v "\.git" | while read script; do
    shellcheck "$script"
  done
}

main "$@"
```

Pretty straightforward to integrate with [travis-ci](http://travis-ci.org) too
(`.travis.yml`):

```yaml
language: bash
install:
  - wget http://ftp.debian.org/debian/pool/main/s/shellcheck/shellcheck_0.3.4-3_amd64.deb
  - sudo dpkg -i shellcheck_0.3.4-3_amd64.deb
  - sudo apt-get update
  - sudo apt-get install -f
  - shellcheck -V
script:
  - ./build.sh
```

I'm already using this in my [dotfiles][dotfiles], and found some really stupid
mistakes to fix. Sure thing, this is an awesome tool!

Wanna see it in the so said _real world_? Check my `build.sh`
[here](https://github.com/caarlos0/dotfiles/blob/master/build.sh) and my
`.travis.yml`
[here](https://github.com/caarlos0/dotfiles/blob/master/.travis.yml).

Hope you like it!

[bashstyle]: https://github.com/progrium/bashstyle
[shellcheck]: https://github.com/koalaman/shellcheck
[dotfiles]: https://github.com/caarlos0/dotfiles
