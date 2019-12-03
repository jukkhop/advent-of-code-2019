import {
  __,
  chain,
  filter,
  map,
  pipe,
  range,
  reduce,
  reduced,
  repeat,
  split,
  zip,
} from 'ramda';

import { run } from './part1';

function main(inputs: string[]) {
  const program = chain(
    pipe(
      split(','),
      filter(Boolean),
      map(Number),
    ),
    inputs,
  );

  const high = 100;
  const rng = range(0, high);

  const pairs: [number, number][] = chain(
    pipe(
      // @ts-ignore
      repeat(__, high),
      zip(rng),
    ),
    rng,
  );

  const result = reduce(
    (_, [noun, verb]) =>
      run(program, noun, verb) === 19690720
        ? reduced(100 * noun + verb)
        : 0,
    0,
    pairs,
  );

  if (!result) {
    throw new Error('Result not found');
  }

  return result;
}

export default main;
