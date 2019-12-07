/* eslint-disable no-param-reassign */

import { apply, head, last, pipe } from 'ramda'
import { combinations } from './part1'

const TERM_SIGNAL = Number.MAX_SAFE_INTEGER

function main([input]: string[]) {
  const program = input
    .split(',')
    .filter(Boolean)
    .map(Number)

  const sequences = combinations(5, 10)

  const outputs = sequences.map(seq => {
    const memory = seq.map(() => program.slice())
    const pointer = seq.map(() => 0)
    const io = seq.map(x => [x])

    io[0].push(0)

    for (;;) {
      seq.forEach((_, i) => {
        pointer[i] = run(
          memory[i],
          pointer[i],
          io[i],
          io[i < memory.length - 1 ? i + 1 : 0]
        )
      })

      if (last(pointer) === TERM_SIGNAL) {
        return pipe(head, last)(io)
      }
    }
  })

  return apply(Math.max, outputs)
}

function run(
  memory: number[],
  start: number,
  input: number[],
  output: number[]
): number {
  let pointer = start

  while (pointer < memory.length) {
    const next = memory[pointer]
      .toString()
      .split('')

    const opcode = Number(
      next
        .slice(Math.max(0, next.length - 2))
        .join('')
    )

    const modes = next
      .slice(0, next.length - 2)
      .reverse()
      .map(Number)

    let incr = 0

    if ([1, 2, 7, 8].includes(opcode)) {
      incr = 4
    } else if ([3, 4].includes(opcode)) {
      incr = 2
    } else if ([5, 6].includes(opcode)) {
      incr = 3
    } else if (opcode === 99) {
      pointer = TERM_SIGNAL
      break
    } else {
      throw new Error(`Bad opcode: ${opcode}`)
    }

    const params = memory.slice(
      pointer + 1,
      pointer + incr
    )

    const values = params.map((p, idx) => {
      const mode = modes[idx]

      if (!mode || mode === 0) {
        return memory[p]
      }

      if (mode === 1) {
        return p
      }

      throw new Error('Bad mode')
    })

    const [p0, p1, p2] = params // eslint-disable-line
    const [v0, v1, v2] = values // eslint-disable-line

    switch (opcode) {
      case 1:
        memory[p2] = v0 + v1
        pointer += incr
        break
      case 2:
        memory[p2] = v0 * v1
        pointer += incr
        break
      case 3:
        if (input.length === 0) {
          return pointer
        }
        memory[p0] = input.shift() || 0
        pointer += incr
        break
      case 4:
        output.push(v0)
        pointer += incr
        break
      case 5:
        pointer = v0 !== 0 ? v1 : pointer + incr
        break
      case 6:
        pointer = v0 === 0 ? v1 : pointer + incr
        break
      case 7:
        memory[p2] = v0 < v1 ? 1 : 0
        pointer += incr
        break
      case 8:
        memory[p2] = v0 === v1 ? 1 : 0
        pointer += incr
        break
      default:
        throw new Error('Failed to match opcode')
    }
  }

  return pointer
}

export default main
