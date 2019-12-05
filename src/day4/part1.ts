import {
  any,
  aperture,
  apply,
  gt,
  inc,
  map,
  pipe,
  range,
  reduceBy,
  toString,
  values
} from 'ramda'

type adjacencyFn = (n: number) => boolean

function validate(
  password: number,
  adjacency: adjacencyFn
): boolean {
  const digits = password
    .toString()
    .split('')
    .map(Number)

  const groups = reduceBy(
    inc,
    0,
    toString,
    digits
  )

  const adjacent = values(groups).some(adjacency)

  if (!adjacent) {
    return false
  }

  const decreases = pipe(
    // @ts-ignore
    aperture(2),
    map(apply(gt)),
    // @ts-ignore
    any(b => b === true)
  )(digits)

  return adjacent && !decreases
}

function main(inputs: string[]) {
  const [lower, higher] = inputs[0]
    .split('-')
    .map(Number)

  const rng = range(lower, higher)
  const adj = (n: number) => n > 1

  const valids = rng.reduce(
    (acc, cur) =>
      validate(cur, adj) ? acc + 1 : acc,
    0
  )

  return valids
}

export default main

export { validate }
