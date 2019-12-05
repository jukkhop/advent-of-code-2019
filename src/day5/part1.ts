import { filter, map, pipe, split } from 'ramda'

function main(inputs: string[]) {
  const [input] = inputs

  const program = pipe(
    split(','),
    filter(Boolean),
    map(Number)
  )(input)

  return run(program, 1)
}

export function run(
  program: number[],
  input: number
): number[] {
  const memory = program.slice()
  const output = new Array<number>()

  let pointer = 0

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

    if ([1, 2].includes(opcode)) {
      incr = 4
    } else if ([3, 4].includes(opcode)) {
      incr = 2
    } else if (opcode === 99) {
      break
    } else {
      throw new Error(`Bad opcode: ${opcode}`)
    }

    const params = memory.slice(
      pointer + 1,
      pointer + incr
    )

    pointer += incr

    const values = params.map((p, idx) => {
      const mode = modes[idx]

      if (!mode || mode === 0) {
        return memory[p]
      }

      if (mode === 1) {
        return p
      }

      throw new Error(`Bad mode: ${mode}`)
    })

    const [p0, p1, p2] = params // eslint-disable-line
    const [v0, v1, v2] = values // eslint-disable-line

    switch (opcode) {
      case 1:
        memory[p2] = v0 + v1
        break
      case 2:
        memory[p2] = v0 * v1
        break
      case 3:
        memory[p0] = input
        break
      case 4:
        output.push(v0)
        break
      default:
        throw new Error('Failed to match opcode')
    }
  }

  return output
}

export default main
