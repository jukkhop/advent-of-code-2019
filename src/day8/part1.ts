import {
  countBy,
  identity,
  map,
  reduce,
  splitEvery
} from 'ramda'

const WIDTH = 25
const HEIGHT = 6

function main([input]: string[]) {
  const digits = input.split('').map(Number)

  const layers = splitEvery(
    WIDTH * HEIGHT,
    digits
  )

  const stats = map(countBy(identity), layers)

  const fewest = reduce(
    // @ts-ignore
    (acc, cur) => {
      const zcur = cur[0] || 0
      const zacc = acc[0] || 0
      return zcur < zacc ? cur : acc
    },
    { '0': Number.MAX_SAFE_INTEGER },
    stats
  )

  return fewest[1] * fewest[2]
}

export default main
