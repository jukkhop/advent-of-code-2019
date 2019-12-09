import { run } from './part1'

function main([input]: string[]) {
  const program = input
    .split(',')
    .filter(Boolean)
    .map(BigInt)

  return run(program, [BigInt(2)])
}

export default main
