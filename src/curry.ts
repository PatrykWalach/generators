interface Curry {
  <Args extends unknown[], R>(fn: (...args: Args) => R): (...args: Args) => R
  <Args extends unknown[], NextArgs extends unknown[], R>(
    fn: (...args: [...NextArgs, ...Args]) => R,
  ): (...args: Args) => (...args: NextArgs) => R
}

export const curry: Curry =
  <Args extends unknown[], NextArgs extends unknown[], R>(
    fn: (...args: Args | [...NextArgs, ...Args]) => R,
  ) =>
  (...args: Args) => {
    if (args.length < fn.length) {
      return (...nextArgs: NextArgs) => fn(...nextArgs, ...args)
    }

    return fn(...args)
  }
