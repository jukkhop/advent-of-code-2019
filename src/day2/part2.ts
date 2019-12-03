import {
  chain,
  filter,
  map,
  pipe,
  range,
  split,
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

  for (const noun of range(0, 100)) {
    for (const verb of range(0, 100)) {
      if (run(program, noun, verb) === 19690720) {
        return 100 * noun + verb;
      }
    }
  }

  throw new Error('Result not found');
}

export default main;
