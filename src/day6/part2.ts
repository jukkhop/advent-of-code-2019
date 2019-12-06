/* eslint-disable no-constant-condition */

import { Node, build, depth, find } from './part1'

function main(inputs: string[]) {
  const root = new Node('COM')

  build(root, inputs)

  const you = find(root, 'YOU')
  const santa = find(root, 'SAN')

  if (!you || !santa) {
    throw new Error('Bad input')
  }

  return distance(you, santa) - 2
}

function lca(a: Node, b: Node): Node | null {
  let { parent } = a

  while (true) {
    if (!parent) {
      return null
    }

    if (find(parent, b.value)) {
      return parent
    }

    parent = parent.parent
  }
}

function distance(a: Node, b: Node): number {
  const ancestor = lca(a, b)

  if (!ancestor) {
    return 0
  }

  return depth(a, ancestor) + depth(b, ancestor)
}

export default main
