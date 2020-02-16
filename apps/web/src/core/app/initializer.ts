/* eslint-disable @typescript-eslint/no-explicit-any */

export type InitializerTask = () => Promise<any>;

export function InitializerFactory() {
  const tasks: InitializerTask[] = [];
  let resolved: Promise<any>;

  function register(task: InitializerTask) {
    tasks.push(task);
  }

  function resolve(): Promise<any> {
    if (resolved) {
      return resolved;
    }

    resolved = Promise.all(tasks.map(initializer => initializer()));

    return resolved;
  }

  return {
    register,
    resolve,
  };
}

export const appInitializer = InitializerFactory();
