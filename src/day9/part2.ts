import { run } from './part1'

function main([input]: string[]) {
  const program = input
    .split(',')
    .filter(Boolean)
    .map(BigInt)

  const memory = program.slice()
  const pointers: [number, number] = [0, 0]
  const inputs = [BigInt(2)]
  const output = new Array<BigInt>()

  run(memory, pointers, inputs, output)

  return output
}

export default main
