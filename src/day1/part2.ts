import { map, pipe, sum } from 'ramda'
import { calc } from './part1'

function main(inputs: string[]) {
  const recur = (mass: number): number => {
    const fuel = calc(mass)
    return fuel > 0 ? fuel + recur(fuel) : 0
  }

  return pipe(
    map(Number),
    map(recur),
    sum
  )(inputs)
}

export default main
