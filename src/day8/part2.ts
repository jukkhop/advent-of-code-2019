import {
  range,
  reduce,
  reduced,
  splitEvery
} from 'ramda'

const WIDTH = 25
const HEIGHT = 6

function main([input]: string[]) {
  const digits = input.split('').map(Number)

  const layers = splitEvery(
    WIDTH * HEIGHT,
    digits
  ).reverse()

  const pixels = [[new Array<number>()]]

  layers.forEach((layer, z) => {
    const rows = splitEvery(WIDTH, layer)

    rows.forEach((row, y) => {
      row.forEach((pixel, x) => {
        if (!pixels[y]) {
          pixels[y] = [new Array<number>()]
        }
        if (!pixels[y][x]) {
          pixels[y][x] = new Array<number>()
        }
        pixels[y][x][z] = pixel
      })
    })
  })

  const encoded = [new Array<number>()]

  for (const y of range(0, HEIGHT)) {
    for (const x of range(0, WIDTH)) {
      const values = pixels[y][x].reverse()
      const value = reduce(
        (acc, cur) => {
          if (cur === 0 || cur === 1) {
            return reduced(cur)
          }
          return acc
        },
        2,
        values
      )

      if (!encoded[y]) {
        encoded[y] = new Array<number>()
      }

      encoded[y][x] = value
    }
  }

  const rendered = encoded
    .map(row => row.join(''))
    .join('\n')

  return rendered
}

export default main
