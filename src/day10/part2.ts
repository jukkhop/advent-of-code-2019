/* eslint-disable no-unused-vars */

import { difference, nth, split } from 'ramda'
import { Vec, detect } from './part1'

const LASER_X = 22
const LASER_Y = 19

function main(inputs: string[]) {
  const rows = inputs.map(split(''))

  let asteroids = rows
    .flatMap((row, y) =>
      row.reduce(
        (a, b, x) => (b === '#' ? a.concat({ x, y }) : a),
        new Array<Vec>()
      )
    )
    .filter(a => a.x !== LASER_X || a.y !== LASER_Y)

  let vaporized = new Array<Vec>()

  while (asteroids.length > 0) {
    const detected = detect(LASER_X, LASER_Y, asteroids)
    asteroids = difference(asteroids, detected)
    vaporized = vaporized.concat(detected)
  }

  const bet = nth(199, vaporized)

  if (!bet) {
    throw new Error('Something went wrong')
  }

  return bet.x * 100 + 8
}

export default main
