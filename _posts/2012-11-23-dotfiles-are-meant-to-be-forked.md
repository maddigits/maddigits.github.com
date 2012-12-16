---
layout: post
title: "Dotfiles Are Meant to Be Forked"
---

## Notícias do dia

> Não estou com vontade de blogar em inglês.

## fuck yeah zsh, automate all the things!

Bom, faz um tempinho que substituí meu bom e velho bash de guerra pelo ainda mais fabuloso ZSH. Também utilizo o VIm há um bom tempo, embora, ultimamente estaja utilizando mais o SublimeText.

Anyway, creio que todo desenvolvedor que se preze cria seus milhoes de scripts, aliases, configurações e etc.. tudo para evitar retrabalhos (tipo ir em milhões de lugares executar um `mvn clean install`) e, creio que o motivo maior seja, AUMENTAR A PRODUTIVIDADE.

Yeah, os scripts mágicos geradores de build são os mais básicos, embora seja muito fácil "complicá-los".

## origins

Enfim, como agora tenho uma nova arma (zsh), alguns dias atrás, forkeei o projeto [holman/dotfiles](http://github.com/holman/dotfiles), pois estava achando o oh-my-zsh muito "pesado" (e não tinha diversas facilidades relacionadas a backup de configurações), e, realmente, os arquivos do holman estão bem mais enxutos e leves.

Porém, ele é voltado ao OSX. Eu sou pobre. Logo, utilizo Linux (na minha mente isso é lógico, se na sua não é, azar seu :]). Os dotfiles do holman estavam diretamente acoplados a homebrew, funções e aplicativos exclusivos do SO da maçã. O que eu fiz? Of course, tunei!

## what?

Yeah bro, o fato de você utilizar os dotfiles de outra pessoa como base, não significa que você TENHA QUE FICAR COM ELES ASSIM PRA SEMPRE.

Sendo assim, removi tudo relacionado ao OSX que consegui encontrar, adicionei algum maven/archlinux-love, alguma coisa que utilizo no trabalho, mudei algo ali, algo aqui, e.. BOOM, meu próprio [dotfiles](http://github.com/caarlos0/dotfiles).

## get it, bro

Para instalar, é necessário ter o rbenv configurado e funcionando, com algum ruby > 1.8 instalado, após isso, siga o "tutorial" no readme do projeto, e tudo deverá funcionar ;)

Você pode alterar suas configurações e chamar `reload!` para atualizar o terminal atual (algo como `source ~/.zshrc`).

`h` é sua `~`.
`c` é sua pasta `~/code`

Diversos aliases.

Execute `alias` para ver todos :)

(BTW, caso você não trabalhe na totvs, `rm -rf ~/.dotfiles/totvs`).

Tem mais umas dicas e coisas a respeito no [post original do zach](http://zachholman.com/2010/08/dotfiles-are-meant-to-be-forked/).

Caso tenha algo que gostaria de acrescentar, não deixe de fazer um pull-request ;)

That's all folks! Até mais.

