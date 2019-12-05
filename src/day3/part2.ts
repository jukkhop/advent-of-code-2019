import {
  apply,
  findIndex,
  inc,
  map,
  pipe,
  sum
} from 'ramda'

import {
  areEqual,
  getIntersections,
  toCommands,
  toPath
} from './part1'

function main(inputs: string[]) {
  const commands = inputs.map(toCommands)
  const paths = commands.map(toPath)
  const xsections = getIntersections(paths)

  const sums = xsections.map(coord =>
    pipe(
      map(findIndex(areEqual(coord))),
      map(inc),
      sum
    )(paths)
  )

  return apply(Math.min, sums)
}

export default main
