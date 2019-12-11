/* eslint-disable no-loop-func */

import {
  findLast,
  groupBy,
  keys,
  length,
  pipe
} from 'ramda'

import { run, TERM_SIGNAL } from '../day9/part1'

export type Panel = {
  x: number
  y: number
  color: number
}

const BLACK = 0
const WHITE = 1

const UP = 0
const RIGHT = 1
const DOWN = 2
const LEFT = 3

function main([input]: string[]) {
  const program = input
    .split(',')
    .filter(Boolean)
    .map(BigInt)

  const panels = paint(program, BLACK)

  const count = pipe(
    groupBy((p: Panel) => `${p.x},${p.y}`),
    keys,
    length
  )(panels)

  return count
}

function paint(memory: BigInt[], initialColor: number) {
  const inputs = [BigInt(initialColor)]
  const output = new Array<BigInt>()
  const panels = new Array<Panel>()

  let pointers: [number, number] = [0, 0]
  let x = 0
  let y = 0
  let direction = UP

  for (;;) {
    pointers = run(memory, pointers, inputs, output)

    if (pointers[0] === TERM_SIGNAL) {
      break
    }

    if (output.length !== 2) {
      throw new Error(`Bad output: ${output}`)
    }

    const color = Number(output.shift())
    const rotate = Number(output.shift())

    panels.push({ x, y, color })

    switch (direction) {
      case UP:
        direction = rotate === 0 ? LEFT : RIGHT
        break
      case RIGHT:
        direction = rotate === 0 ? UP : DOWN
        break
      case DOWN:
        direction = rotate === 0 ? RIGHT : LEFT
        break
      case LEFT:
        direction = rotate === 0 ? DOWN : UP
        break
      default:
        break
    }

    switch (direction) {
      case UP:
        y -= 1
        break
      case RIGHT:
        x += 1
        break
      case DOWN:
        y += 1
        break
      case LEFT:
        x -= 1
        break
      default:
        break
    }

    const panel = findLast(
      p => p.x === x && p.y === y,
      panels
    )

    inputs.push(BigInt(panel ? panel.color : BLACK))
  }

  return panels
}

export default main

export { paint, WHITE }
