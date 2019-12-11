/* eslint-disable no-unused-vars */

import {
  apply,
  groupBy,
  last,
  map,
  pipe,
  prop,
  values
} from 'ramda'

import { Panel, paint, WHITE } from './part1'
import { initMatrix } from '../day8/part2'

function main([input]: string[]) {
  const program = input
    .split(',')
    .filter(Boolean)
    .map(BigInt)

  const panels: Panel[] = pipe(
    groupBy((p: Panel) => `${p.x},${p.y}`),
    values,
    map(last)
  )(paint(program, WHITE))

  const xs = map(prop('x'), panels)
  const ys = map(prop('y'), panels)

  const width = range(xs)
  const height = range(ys)

  const matrix = initMatrix(width + 5, height + 5, '.')

  panels.forEach(({ x, y, color }) => {
    matrix[y + 2][x + 2] = color === 1 ? '#' : '.'
  })

  return matrix.map(row => row.join('')).join('\n')
}

function range(list: number[]) {
  return apply(Math.max, list) - apply(Math.min, list)
}

export default main
