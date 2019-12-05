import {
  add,
  chain,
  filter,
  map,
  multiply,
  pipe,
  split
} from 'ramda'

function main(inputs: string[]) {
  const program = chain(
    pipe(
      split(','),
      filter(Boolean),
      map(Number)
    ),
    inputs
  )

  return run(program, 12, 2)
}

export function run(
  program: number[],
  input1: number,
  input2: number
): number {
  const memory = program.slice()

  memory[1] = input1
  memory[2] = input2

  for (let i = 0; i < memory.length; i += 4) {
    const [opcode, p1, p2, p3] = memory.slice(
      i,
      i + 4
    )

    if (opcode === 99) {
      break
    }

    const op = getOperation(opcode)

    if (op) {
      memory[p3] = op(memory[p1], memory[p2])
    }
  }

  return memory[0]
}

function getOperation(code: number): Operation {
  switch (code) {
    case 1:
      return add
    case 2:
      return multiply
    case 99:
      return undefined
    default:
      throw new Error(`Bad opcode: ${code}`)
  }
}

type Operation =
  | ((arg0: number, arg1: number) => number)
  | undefined

export default main
