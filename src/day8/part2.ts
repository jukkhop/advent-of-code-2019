import {
  defaultTo,
  range,
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

  const pixels = initTensor(
    WIDTH,
    HEIGHT,
    layers.length,
    -1
  )

  layers.reverse().forEach((layer, z) => {
    const rows = splitEvery(WIDTH, layer)

    rows.forEach((row, y) => {
      row.forEach((pixel, x) => {
        pixels[y][x][z] = pixel
      })
    })
  })

  const encoded = initMatrix(WIDTH, HEIGHT, -1)

  for (const y of range(0, HEIGHT)) {
    for (const x of range(0, WIDTH)) {
      const value = pixels[y][x]
        .reverse()
        .find(v => v === 0 || v === 1)

      encoded[y][x] = defaultTo(2, value)
    }
  }

  return encoded
    .map(row => row.join(''))
    .join('\n')
}

function initMatrix(
  width: number,
  height: number,
  fill: number
): number[][] {
  const array = [new Array<number>()]

  for (const y of range(0, height)) {
    for (const x of range(0, width)) {
      if (!array[y]) {
        array[y] = new Array<number>()
      }

      array[y][x] = fill
    }
  }

  return array
}

function initTensor(
  width: number,
  height: number,
  depth: number,
  fill: number
): number[][][] {
  const array = [[new Array<number>()]]

  for (const y of range(0, height)) {
    for (const x of range(0, width)) {
      for (const z of range(0, depth)) {
        if (!array[y]) {
          array[y] = [new Array<number>()]
        }

        if (!array[y][x]) {
          array[y][x] = new Array<number>()
        }

        array[y][x][z] = fill
      }
    }
  }

  return array
}

export default main
