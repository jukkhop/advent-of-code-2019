const func = (inputs: string[]): number => {
  const fuels = inputs
    .map(x => Number(x))
    .map(x => x / 3.0)
    .map(x => Math.floor(x))
    .map(x => x - 2);

  const sum = fuels.reduce((sum, fuel) => sum + fuel, 0);

  return sum;
};

export default func;
