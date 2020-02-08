export type InitializerTask = () => Promise<any>;

export function InitializerFactory() {
  const tasks: InitializerTask[] = [];

  function register(task: InitializerTask) {
    tasks.push(task);
  }

  function resolve(): Promise<any> {
    return Promise.all(tasks.map(initializer => initializer()));
  }

  return {
    register,
    resolve,
  };
}

export const appInitializer = InitializerFactory();
