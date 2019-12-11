/* eslint-disable no-loop-func */
/* eslint-disable no-param-reassign */

import { defaultTo } from 'ramda'

const TERM_SIGNAL = Number.MAX_SAFE_INTEGER
const READ = 0
const WRITE = 1

const ptypes = {
  1: [READ, READ, WRITE],
  2: [READ, READ, WRITE],
  3: [WRITE],
  4: [READ],
  5: [READ, READ],
  6: [READ, READ],
  7: [READ, READ, WRITE],
  8: [READ, READ, WRITE],
  9: [READ]
}

function main([input]: string[]) {
  const program = input
    .split(',')
    .filter(Boolean)
    .map(BigInt)

  const memory = program.slice()
  const pointers: [number, number] = [0, 0]
  const inputs = [BigInt(1)]
  const output = new Array<BigInt>()

  run(memory, pointers, inputs, output)

  return output
}

function run(
  memory: BigInt[],
  pointers: [number, number],
  inputs: BigInt[],
  output: BigInt[]
): [number, number] {
  let [pointer, relative] = pointers

  while (pointer < memory.length) {
    const next = memory[pointer].toString().split('')

    const opcode = Number(
      next.slice(Math.max(0, next.length - 2)).join('')
    )

    const modes = next
      .slice(0, next.length - 2)
      .reverse()
      .map(Number)

    let incr = 0

    if ([1, 2, 7, 8].includes(opcode)) {
      incr = 4
    } else if ([3, 4, 9].includes(opcode)) {
      incr = 2
    } else if ([5, 6].includes(opcode)) {
      incr = 3
    } else if (opcode === 99) {
      pointer = TERM_SIGNAL
      break
    } else {
      throw new Error(`Bad opcode: ${opcode}`)
    }

    const values = memory
      .slice(pointer + 1, pointer + incr)
      .map((pBig, idx) => {
        const mode = modes[idx]

        // @ts-ignore
        const ptype: number = ptypes[opcode][idx]
        const p = Number(pBig)

        if (!mode || mode === 0) {
          return ptype === READ ? memory[p] : pBig
        }

        if (mode === 1) {
          return pBig
        }

        if (mode === 2) {
          return ptype === READ
            ? memory[p + relative]
            : BigInt(p + relative)
        }

        throw new Error(`Bad mode: ${mode}`)
      })
      .map(defaultTo(BigInt(0)))

    const [v0, v1] = values
    const [v0n, v1n, v2n] = values.map(Number)

    switch (opcode) {
      case 1:
        memory[v2n] = BigInt(v0n + v1n)
        pointer += incr
        break
      case 2:
        memory[v2n] = BigInt(v0n * v1n)
        pointer += incr
        break
      case 3:
        if (inputs.length === 0) {
          return [pointer, relative]
        }
        memory[v0n] = BigInt(inputs.shift() || 0)
        pointer += incr
        break
      case 4:
        output.push(v0)
        pointer += incr
        break
      case 5:
        pointer = v0n !== 0 ? v1n : pointer + incr
        break
      case 6:
        pointer = v0n === 0 ? v1n : pointer + incr
        break
      case 7:
        memory[v2n] = BigInt(v0 < v1 ? 1 : 0)
        pointer += incr
        break
      case 8:
        memory[v2n] = BigInt(v0 === v1 ? 1 : 0)
        pointer += incr
        break
      case 9:
        relative += v0n
        pointer += incr
        break
      default:
        throw new Error('Failed to match opcode')
    }
  }

  return [pointer, relative]
}

export default main

export { run, TERM_SIGNAL }
