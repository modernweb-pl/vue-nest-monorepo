import type { Action, ActionTree, Getter, GetterTree, Mutation, MutationTree } from 'vuex';

/**
 * Set of helpers to handle Vuex more "typed" way.
 */

/**
 * Create getter factory function which will automatically type getter arguments.
 *
 * Usage:
 * ```
 * const createGetter = createGetterFactory<State, RootState>();
 * const getters = {
 *   getCounter: createGetter((state): number => state.counter)
 * }
 * ```
 */
export function createGetterFactory<S, R>() {
  return (getter: Getter<S, R>) => getter;
}

/**
 * Create namespaced getter map to be used as reference when accessing state.
 *
 * Usage:
 * ```
 * const namespace = 'counter';
 * const getters = {
 *   getCounter: createGetter((state): number => state.counter)
 * }
 *
 * export const counterGetters = createGetterMap<typeof getters, State, RootState>(namespace, getters);
 * // => { getCounter: 'counter/getCounter' }
 *
 * // then you can use:
 * const counter = store.getters[counterGetters.getCounter];
 * ```
 */
export function createGetterMap<K extends object, S, R>(
  namespace: string,
  getters: GetterTree<S, R>,
): { [key in keyof K]: string } {
  return Object.keys(getters).reduce((acc, key) => {
    acc[key as keyof K] = `${namespace}/${key}`;
    return acc;
  }, {} as { [key in keyof K]: string });
}

export function createActionFactory<S, R>() {
  return (action: Action<S, R>) => action;
}

export function createActionMap<K extends object, S, R>(
  namespace: string,
  actions: ActionTree<S, R>,
): { [key in keyof K]: string } {
  return Object.keys(actions).reduce((acc, key) => {
    acc[key as keyof K] = `${namespace}/${key}`;
    return acc;
  }, {} as { [key in keyof K]: string });
}

export function createMutationFactory<S>() {
  return (mutation: Mutation<S>) => mutation;
}

export function createMutationMap<K extends object, S>(
  namespace: string,
  mutations: MutationTree<S>,
): { [key in keyof K]: string } {
  return Object.keys(mutations).reduce((acc, key) => {
    acc[key as keyof K] = `${namespace}/${key}`;
    return acc;
  }, {} as { [key in keyof K]: string });
}
