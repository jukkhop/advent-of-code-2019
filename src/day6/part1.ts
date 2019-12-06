import { chain, pipe, split, uniq } from 'ramda'

function main(inputs: string[]) {
  const root = new Node('COM')

  build(root, inputs)

  const objects = pipe(
    chain(split(')')),
    uniq
  )(inputs)

  return objects.reduce((sum, obj) => {
    const node = find(root, obj)
    return node ? sum + depth(node, root) : sum
  }, 0)
}

class Node {
  value: string
  children: Node[]
  parent: Node | null

  constructor(value: string) {
    this.value = value
    this.children = new Array<Node>()
    this.parent = null
  }

  setParent(node: Node) {
    this.parent = node
  }

  addChild(node: Node) {
    node.setParent(this)
    this.children[this.children.length] = node
  }
}

function build(node: Node, inputs: string[]) {
  inputs.forEach(input => {
    const [p, c] = input.split(')')

    if (p === node.value) {
      const child = new Node(c)
      node.addChild(child)
      build(child, inputs)
    }
  })
}

function depth(from: Node, to: Node): number {
  let cur = from
  let res = 0

  while (cur.value !== to.value) {
    if (!cur.parent) {
      return 0
    }

    cur = cur.parent
    res += 1
  }

  return res
}

function find(
  node: Node,
  value: string
): Node | null {
  if (node.value === value) {
    return node
  }

  for (const child of node.children) {
    const result = find(child, value)

    if (result) {
      return result
    }
  }

  return null
}

export default main

export { Node, build, depth, find }
