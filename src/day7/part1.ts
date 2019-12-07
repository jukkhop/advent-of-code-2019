import {
  apply,
  compose,
  defaultTo,
  equals,
  filter,
  flip,
  last,
  length,
  map,
  of,
  pipe,
  range,
  repeat,
  // @ts-ignore
  sequence,
  uniq
} from 'ramda'

import { run } from '../day5/part2'

function main([input]: string[]) {
  const program = input
    .split(',')
    .filter(Boolean)
    .map(Number)

  const sequences = combinations(0, 5)

  const outputs = sequences.map(seq => {
    const output = seq.reduce(
      (io, phase) =>
        pipe(
          last,
          defaultTo(0)
        )(run(program, [phase, io])),
      0
    )
    return output
  })

  return apply(Math.max, outputs)
}

function combinations(
  low: number,
  high: number
): (readonly number[])[] {
  const count = high - low

  const perms: number[][] = compose(
    sequence(of),
    flip(repeat)
    // @ts-ignore
  )(count, range(low, high))

  const filterRepeats = pipe(
    uniq,
    length,
    equals(count)
  )

  return perms.filter(filterRepeats)
}

export default main

export { combinations }
