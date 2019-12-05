/* eslint-disable no-unused-vars */

import {
  apply,
  filter,
  innerJoin,
  map,
  pipe,
  split,
  sum,
  uncurryN
} from 'ramda'

export type Coord = [number, number]

const areEqual = (a: Coord) => (b: Coord) =>
  a[0] === b[0] && a[1] === b[1]

enum Direction {
  Up = 'U',
  Down = 'D',
  Left = 'L',
  Right = 'R'
}

interface Command {
  dir: Direction
  magn: number
}

function main(inputs: string[]) {
  const commands = inputs.map(toCommands)
  const paths = commands.map(toPath)
  const xsections = getIntersections(paths)

  const manhattan = pipe(map(Math.abs), sum)

  return pipe(
    map(manhattan),
    apply(Math.min)
  )(xsections)
}

function toCommands(input: string): Command[] {
  return pipe(
    split(','),
    filter(Boolean),
    map(x => {
      const [dir, ...magn] = x.split('')
      const cmd: Command = {
        dir: dir as Direction,
        magn: Number(magn.join(''))
      }
      return cmd
    })
  )(input)
}

function toPath(commands: Command[]): Coord[] {
  let x = 0
  let y = 0
  const path = new Array<Coord>()

  commands.forEach(cmd => {
    const { dir } = cmd
    let { magn } = cmd

    while (magn > 0) {
      switch (dir) {
        case Direction.Up:
          y += 1
          break
        case Direction.Down:
          y -= 1
          break
        case Direction.Left:
          x -= 1
          break
        case Direction.Right:
          x += 1
          break
        default:
          throw new Error('Bad direction')
      }

      magn -= 1
      path.push([x, y])
    }
  })

  return path
}

function getIntersections(
  paths: Coord[][]
): Coord[] {
  return apply(
    innerJoin(uncurryN(2, areEqual)),
    paths
  )
}

export default main

export {
  areEqual,
  getIntersections,
  toCommands,
  toPath
}
