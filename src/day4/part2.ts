import { range } from 'ramda'
import { validate } from './part1'

function main(inputs: string[]) {
  const [low, high] = inputs[0]
    .split('-')
    .map(Number)

  const rng = range(low, high)
  const adj = (n: number) => n === 2

  const valids = rng.reduce(
    (acc, cur) =>
      validate(cur, adj) ? acc + 1 : acc,
    0
  )

  return valids
}

export default main
