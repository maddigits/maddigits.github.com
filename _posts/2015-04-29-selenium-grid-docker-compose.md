---
layout: post
title: "Running a Selenium Grid with docker-compose"
---

At [ContaAzul](http://contaazul.com), we had 31 Windows machines powering our
Selenium tests - one running the grid and 30 more running clients. Needless
to say, this is **very** expensive.

As we are already using [Docker](http://docker.io/) to run our builds (on
[Shippable](http://shippable.com)), we decided to try it out to run Selenium
tests too.

It was no surprise that Selenium guys already made a ready-to-go set of Docker
images. There are images for the grid itself, for Firefox and for Chrome.
The browser images also have a debug version - which allow you to access them
using VNC to _see what's happening there_. You can read more about this in their
[GitHub account](https://github.com/SeleniumHQ/docker-selenium).

So, I created a `c3.4xlarge` EC2 machine and installed both
Docker and docker-compose following their respective README's:

```sh
# install docker:
$ wget -qO- https://get.docker.com/ | sh

# install docker-compose:
$ curl -L https://github.com/docker/compose/releases/download/1.2.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
$ chmod +x /usr/local/bin/docker-compose
```

Then, I created a simple `docker-compose.yml` file like this:

```yaml
hub:
  image: selenium/hub
  ports:
    - "4444:4444"
firefox:
  image: selenium/node-firefox
  links:
    - hub
chrome:
  image: selenium/node-chrome
  links:
    - hub
```

Put this up and running is pretty straightforward:

```sh
$ docker-compose up
```

After that, it is just a matter of telling the selenium test runner to connect
on the Docker host machine on port `4444`, and everything will just work.

But, well, we had 30 machines before... now I only have 2 selenium instances
running (one with Firefox and other with Chrome). How can I fix that?
Well, I'm glad you asked:

```sh
$ docker-compose scale chrome=15 firefox=15
```

Around 10 seconds later, I had 30 selenium instances up and running, **sweat**.

## Try it out

Want to try it out? I created a simple set of shell scripts that should help
you get there really fast.

Start a fresh linux machine (or not, your call) and hit:

```sh
$ git clone https://github.com/caarlos0/selenium-grid-on-docker.git
```

`cd` to the dir, and install both `docker` and `docker-compose`:

```sh
$ sudo ./install.sh
```

Docker will suggest you to add your use to the `docker` group. You should do
that:

```sh
$ sudo usermod -aG docker your-username
```

Now, let's make it work!

```sh
$ ./run.sh
```

This command will pull and run 3 containers: hub, firefox and chrome. You can
scale things up with:

```sh
$ ./scale.sh 10
```

This will scale to 10 Chrome machines and 10 Firefox machines (be aware it
will eat some memory - it's 10 browsers, after all).

![Running 4 Firefox and 4 Chrome instances on my laptop](/public/images/docker-on-my-machine-scale-4.png)
> Running 4 Firefox and 4 Chrome instances on my laptop!

### Conclusions

**Docker is great!** (I can't say this enough)

Some people don't yet trust Docker enough to put it in production, or are
scared of the lack of knowledge, or whatever. I can only suggest you to
start testing it in development machines, CI environments and so forth. It is
safe and will surely learn a lot (and love almost every second of it).

The best part: need more speed? Just change the instance type and let
docker-compose scale it up!
The other best part (yes there is more than one): you can put 30 Selenium
machines to run in a few seconds. Try that with 30 Windows machines.

More important than all, we dropped our EC2 billing related to Selenium
by ~**77%**! Even if the instances where all Linux before, it would still
be something around **57%** (as you can see in the image).

![ec2 values](/public/images/docker-selenium-ec2-values.png)

That's really **AWESOME**!!!

> 50% usage is because we only use them about 12 hours per day (business hours,
give or take).
