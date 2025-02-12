# remark-images

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**remark**][remark] plugin to add an improved image syntax.

## Note!

This plugin is ready for the new parser in remark
([`remarkjs/remark#536`](https://github.com/remarkjs/remark/pull/536)).
No change is needed: it works exactly the same now as it did before!

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

[npm][]:

```sh
npm install remark-images
```

## Use

Say we have the following file, `example.md`:

```markdown
#### A url

Below will render an image:

https://c8r-x0.s3.amazonaws.com/lab-components-macbook.jpg
```

And our module, `example.js`, looks as follows:

```js
import {readSync} from 'to-vfile'
import {remark} from 'remark'
import remarkImages from 'remark-images'

const file = readSync('example.md')

remark()
  .use(remarkImages)
  .process(file)
  .then((file) => {
    console.log(String(file))
  })
```

Now, running `node example` yields:

```markdown
#### A url

Below will render an image:

[![](https://c8r-x0.s3.amazonaws.com/lab-components-macbook.jpg)](https://c8r-x0.s3.amazonaws.com/lab-components-macbook.jpg)
```

## API

This package exports no identifiers.
The default export is `remarkImages`.

### `unified().use(remarkImages)`

Add an improved image syntax.
Transform URLs in text that reference images (`png`, `svg`, `jpg`, `jpeg`, or
`gif`) to images.

Supported URLs / URIs:

*   `https://example.com/image.jpg`
*   `/image.jpg`
*   `./image.jpg`
*   `../image.jpg`

## Security

Although this plugin should be safe to use, always be careful with user input.
For example, it’s possible to hide JavaScript inside images (such as GIFs,
WebPs, and SVGs).
User provided images open you up to a [cross-site scripting (XSS)][xss] attack.

This may become a problem if the Markdown later transformed to
[**rehype**][rehype] ([**hast**][hast]) or opened in an unsafe Markdown viewer.

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [John Otander][author]

<!-- Definitions -->

[build-badge]: https://github.com/remarkjs/remark-images/workflows/main/badge.svg

[build]: https://github.com/remarkjs/remark-images/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-images.svg

[coverage]: https://codecov.io/github/remarkjs/remark-images

[downloads-badge]: https://img.shields.io/npm/dm/remark-images.svg

[downloads]: https://www.npmjs.com/package/remark-images

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-images.svg

[size]: https://bundlephobia.com/result?p=remark-images

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/remarkjs/remark/discussions

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/remarkjs/.github/blob/HEAD/support.md

[coc]: https://github.com/remarkjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://johno.com

[remark]: https://github.com/remarkjs/remark

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[rehype]: https://github.com/rehypejs/rehype

[hast]: https://github.com/syntax-tree/hast
