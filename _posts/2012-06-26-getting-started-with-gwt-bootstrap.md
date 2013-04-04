---
layout: post
title: "Getting started with GWT-Bootstrap"
---

[GWT-Bootstrap](http://gwtbootstrap.github.com) is a project that aims to provide all the [Twitter Bootstrap](http://twitter.github.com/bootstrap) styles and widgets to GWT applications.
I have this idea in Jan/2012, and it was not a library, initally, I just made a simple `InputText` and `Button` widgets, and I think: _"Why not?"_.

So, here we go. The [initial release is almost done](https://github.com/gwtbootstrap/gwt-bootstrap/issues?milestone=3&page=1&state=open), and has a lot of widgets and functionaly ported and working, including the awesome _responsiveness_ and the great _NavBar_.

So, let's start using it.

## Get the jar

There are 2 ways to get the jar:

* [Maven](https://github.com/gwtbootstrap/gwt-bootstrap/wiki/Using-GWT-Bootstrap-Maven-Repository)
* [Downloading the jar by hand and put it in you app classpath](https://github.com/gwtbootstrap/gwt-bootstrap/downloads)

## Configuring you module

You will have to configure your _App.gwt.xml_ file to _inherit_ the GWT-Bootstrap widget library.
You can do it like this:

{% highlight xml %}
<inherits name="com.github.gwtbootstrap.Bootstrap"/>
{% endhighlight %}

## UiBinder usage

Assuming that you're using UIBinder, add the following namespace to the `<ui:UIBinder>` element:

{% highlight xml %}
xmlns:b="urn:import:com.github.gwtbootstrap.client.ui"
{% endhighlight %}

Then you can easily use the `b` namespace in your widget design, like `Heading`:

{% highlight xml %}
<b:heading size="2">Hello World GWT-Bootstrap</b:heading>
{% endhighlight %}

## Datepicker

We also have the [bootstrap datepicker](https://github.com/eternicode/bootstrap-datepicker) ported into GWT-Bootstrap, but, in a different module and namespace.

Add to your _App.gwt.xml_:

{% highlight xml %}
<inherits name='com.github.gwtbootstrap.datepicker.Datepicker' />
{% endhighlight %}

And in your _Widget.ui.xml_ file:

{% highlight xml %}
xmlns:b2="urn:import:com.github.gwtbootstrap.datepicker.client.ui"
{% endhighlight %}

The, just use the widget like this:

{% highlight xml %}
<b2:DateBox format="dd/mm/yyyy" autoClose="true" />
{% endhighlight %}


## Pros and Cons

### Pros

* Easy to setup and use
* Themeable
* Almost all widgets ported
* Active forum and development

### Cons

* Doesn't support for `less` files ([#29](https://github.com/gwtbootstrap/gwt-bootstrap/issues/29))
* Load all the _JavaScript_ files in the bootstrap of the app ([#70](https://github.com/gwtbootstrap/gwt-bootstrap/issues/70))


**Happy coding!**
