---
title: "Markdown测试页面"
date: "2018-04-08T00:00:00Z"
cover: "https://picsum.photos/600/400?random"
category: "测试"
tags: ["测试", "markdown"]
publish: true
---

## Headings

# h1 Heading

## h2 Heading

### h3 Heading

#### h4 Heading

##### h5 Heading

###### h6 Heading

<br>

## Blockquotes

> Blockquotes can also be nested...
>
> > ...by using additional greater-than signs right next to each other...
> >
> > > ...or with spaces between arrows.

<br>

## Lists

### Unordered:

- Create a list by starting a line with `+`, `-`, or `*`
- Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    - Ac tristique libero volutpat at
    - Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
- Very easy!

### Ordered:

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as `1.`

### Start numbering with offset:

58. foo
1. bar

<br>

## Task Lists

- [ ] a task list item
- [ ] list syntax required
- [ ] normal **formatting**, @mentions, #1234 refs
- [ ] incomplete
- [x] completed

<br>

## Code Blocks

### inline:

Inline `code`

### simple:

```
function test() {
  console.log("notice the blank line before this function?");
}
```

### syntax highlighting:

```ruby
require 'redcarpet'
markdown = Redcarpet.new("Hello World!")
puts markdown.to_html
```

### line highlighting:

```javascript{2}
function test() {
  console.log("notice the blank line before this function?");
}
```

<br>

## Math Blocks

$$
\mathbf{V}_1 \times \mathbf{V}_2 =  \begin{vmatrix}
\mathbf{i} & \mathbf{j} & \mathbf{k} \\
\frac{\partial X}{\partial u} &  \frac{\partial Y}{\partial u} & 0 \\
\frac{\partial X}{\partial v} &  \frac{\partial Y}{\partial v} & 0 \\
\end{vmatrix}
$$

<br>

## Tables

| First Header | Second Header |
| ------------ | ------------- |
| Content Cell | Content Cell  |
| Content Cell | Content Cell  |

| Left-Aligned  | Center Aligned  | Right Aligned |
| :------------ | :-------------: | ------------: |
| col 3 is      | some wordy text |         $1600 |
| col 2 is      |    centered     |           $12 |
| zebra stripes |    are neat     |            $1 |

<br>

## Footnotes

You can create footnotes like this[^footnote].

There is another foonote[^no2].

[^footnote]: Here is the *text* of the **footnote**.

[^no2]: Another foonote.

## Horizontal Rules

***

---

<br>

## Links

### Internal Links:

This is [an example](http://example.com/ "Title") inline link.

[This link](http://example.net/) has no title attribute.

### Reference Links:

This is [an example][id] reference-style link.

Then, anywhere in the document, you define your link label like this, on a line by itself:

[id]: http://example.com/

<br>

## URLs

<i@typora.io>

<br>
<br>
<br>

## Images

![Alt text](https://octodex.github.com/images/minion.png)

![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

<br>

## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~

<u>Underline</u>

<br>

## Emoji

:smile: :cry: :dog: :cat:

<br>

## Inline Math

$\lim_{x \to \infty} \exp(-x) = 0$

<br>

## Subscript / Superscript

H~2~O

X^2^

<br>

## Highlight

==highlight==
