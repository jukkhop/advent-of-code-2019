import {
  __,
  divide,
  map,
  pipe,
  subtract,
  sum
} from 'ramda'

const calc = pipe(
  divide(__, 3.0),
  Math.floor,
  subtract(__, 2)
)

function main(inputs: string[]) {
  return pipe(
    //
    map(Number),
    map(calc),
    sum
  )(inputs)
}

export default main

export { calc }
