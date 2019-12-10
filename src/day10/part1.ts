import { maxBy } from 'lodash'

import {
  ascend,
  dropRepeatsWith,
  eqProps,
  filter,
  map,
  pick,
  pipe,
  prop,
  sortWith,
  split
} from 'ramda'

export type Vec = {
  x: number
  y: number
}

function main(inputs: string[]) {
  const rows = inputs.map(split(''))

  const asteroids = rows.flatMap((row, y) =>
    row.reduce(
      (a, b, x) => (b === '#' ? a.concat({ x, y }) : a),
      new Array<Vec>()
    )
  )

  const sights = asteroids.map(({ x, y }) => {
    const detected = detect(x, y, asteroids)
    return {
      x,
      y,
      count: detected.length,
      detected
    }
  })

  return maxBy(sights, prop('count'))
}

function detect(
  x: number,
  y: number,
  asteroids: Vec[]
): Vec[] {
  return pipe(
    // @ts-ignore
    filter(ast => ast.x !== x || ast.y !== y),
    map((ast: Vec) => {
      const dx = ast.x - x
      const dy = y - ast.y
      const angle = getAngle(dx, dy)
      return {
        ...ast,
        angle: Math.round(angle * 100) / 100,
        dist: Math.sqrt(dx ** 2 + dy ** 2)
      }
    }),
    sortWith([
      //
      ascend(prop('angle')),
      ascend(prop('dist'))
    ]),
    dropRepeatsWith(eqProps('angle')),
    map(pick(['x', 'y']))
  )(asteroids)
}

function getAngle(x: number, y: number) {
  const angle = Math.atan2(-x, -y) * (180 / Math.PI) - 180
  return angle < 0 ? 360 + angle : angle
}

export default main

export { detect }
