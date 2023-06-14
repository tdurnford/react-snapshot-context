import { type Context, useContext } from 'react';

import { ContextValue, SnapshotContext } from './createSnapshotContext';

/**
 * React hook that provides the current context value for the given SnapshotContext.
 * This hook should be used inside a function component that is a child of a `SnapshotProvider`.
 *
 * @template T The type of the context value.
 * @param {SnapshotContext<T>} context The SnapshotContext to use.
 *
 * @returns {ContextValue<T>} The current context value. The returned object contains:
 *   - `getSnapshot`: A function that returns the current state.
 *   - `setSnapshot`: A function that updates the state. Accepts a new state value or a function that produces the new state.
 *   - `subscribe`: A function that allows the component to listen to state changes. Accepts a listener function that will be called whenever the state changes.
 */
export const useSnapshotContext = <T>(context: SnapshotContext<T>): ContextValue<T> => {
  return useContext(context as unknown as Context<T>) as unknown as ContextValue<T>;
};
