/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').Image} Image
 * @typedef {import('mdast').Link} Link
 */

import isUrl from 'is-url'
import {visitParents} from 'unist-util-visit-parents'
import {is} from 'unist-util-is'

const isImgExt = (/** @type {string} */ value) =>
  /\.(svg|png|jpg|jpeg|gif)$/.test(value)
const isImgPath = (/** @type {string} */ value) =>
  value.startsWith('/') || value.startsWith('./') || value.startsWith('../')

/**
 * Plugin to add an improved image syntax.
 *
 * @type {import('unified').Plugin<void[], Root>}
 */
export default function remarkImages() {
  return (tree) => {
    visitParents(tree, 'text', (node, parents) => {
      const value = String(node.value).trim()

      if ((isUrl(value) || isImgPath(value)) && isImgExt(value)) {
        let interactive = false
        let length = parents.length
        const parent = parents[length - 1]
        const siblings = parent.children
        // @ts-expect-error: too many possible parents.
        const index = siblings.indexOf(node)

        // Check if we’re in interactive content.
        while (length--) {
          if (is(parents[length], ['link', 'linkReference'])) {
            interactive = true
            break
          }
        }

        /** @type {Image} */
        const image = {
          type: 'image',
          url: value,
          title: null,
          alt: '',
          position: node.position
        }
        /** @type {Image|Link} */
        let next = image

        // Add a link if we’re not already in one.
        if (!interactive) {
          next = {
            type: 'link',
            url: value,
            title: null,
            children: [image],
            position: node.position
          }
        }

        siblings[index] = next
      }
    })
  }
}
