import React, {
  type FC,
  createContext,
  type PropsWithChildren,
  type Provider,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef
} from 'react';

import { produce } from 'immer';
import isEqual from 'lodash/isEqual';

export type ContextValue<T> = {
  getSnapshot: () => T;
  setSnapshot: (updatedState: T | ((draft: T) => void)) => void;
  subscribe: (listener: () => void) => () => void;
};

type Props<T> = {
  children?: ReactNode;
  onChange?: (value: T) => void;
} & (
  | {
      value: T;
    }
  | {
      initialValue: T;
    }
);

export type SnapshotContext<T> = Omit<ReturnType<typeof createContext<ContextValue<T>>>, 'Provider'> & {
  Provider: FC<Props<T>>;
};

/**
 * The arguments that can be passed to the `createSnapshotContext` function.
 *
 * Both the default value and options are optional. However, if you want to suppress
 * errors and allow the snapshot hooks to be used outside the of the context, you must
 * provide a default value.
 */
type Args<T> =
  | []
  | [defaultValue: T]
  | [defaultValue?: T, options?: { suppressErrors?: false }]
  | [defaultValue: T, options: { suppressErrors?: true }];

/**
 * Creates a Snapshot context. This pattern brings several benefits:
 * 1. It provides a way to share state across multiple components without
 *    prop drilling.
 * 2. It allows you to subscribe to state changes, thus re-rendering only the
 *    components that are dependent on a certain piece of state when that state
 *    changes, rather than re-rendering the entire component tree.
 * 3. It encapsulates state logic, making components easier to test and reason about.
 *
 * @template T The type of the context value.
 *
 * @returns {SnapshotContext<T>} A context object with the following properties:
 *   - `SnapshotProvider`: A context provider component.
 *   - `Consumer`: A React component that subscribes to context changes.
 *   - `displayName`: A string used in React DevTools to display the context.
 *
 * @example
 * // Assuming state is of type number
 * const NumberContext = createSnapshotContext<number>();
 *
 * export const useNumber = (): [Number, (num: Number) => void] => {
 *  const { getSnapshot, setSnapshot, subscribe } = useSnapshotContext(PivotContext);
 *  const [localNumber, setLocalNumber] = useState(() => getSnapshot());
 *
 *  useEffect(() => {
 *    return subscribe(() => {
 *      setLocalNumber(getSnapshot());
 *    });
 *  });
 *
 *  return [localNumber, setSnapshot];
 * };
 *
 * <NumberContext.SnapshotProvider defaultValue={10}>
 *   <MyComponent />
 * </NumberContext.SnapshotProvider>
 */
export const createSnapshotContext = <T,>(...args: Args<T>): SnapshotContext<T> => {
  const [defaultValue, options] = args;

  const BaseContext = createContext<ContextValue<T>>({
    getSnapshot() {
      if (!options?.suppressErrors) {
        throw new Error('Cannot be accessed outside of snapshot provider');
      }
      return defaultValue as T;
    },
    setSnapshot() {
      if (!options?.suppressErrors) {
        throw new Error('Cannot be accessed outside of snapshot provider');
      }
    },
    subscribe() {
      if (!options?.suppressErrors) {
        throw new Error('Cannot be accessed outside of snapshot provider');
      }
      return () => void 0;
    }
  });

  const BaseProvider = BaseContext.Provider;

  const SnapshotProvider = (props: PropsWithChildren<Props<T>>) => {
    const { children, onChange } = props;
    const state = useRef<T>('value' in props ? props.value : props.initialValue);
    const listeners = useRef(new Set<() => void>());

    const getSnapshot = useCallback<ContextValue<T>['getSnapshot']>(() => {
      return state.current;
    }, []);

    const setSnapshot = useCallback<ContextValue<T>['setSnapshot']>(
      updatedState => {
        const updated =
          typeof updatedState === 'function'
            ? produce(state.current, updatedState as (draft: T) => void)
            : updatedState;
        state.current = updated;
        listeners.current.forEach(listener => listener());
        onChange?.(updated);
      },
      [onChange]
    );

    const subscribe = useCallback<ContextValue<T>['subscribe']>(listener => {
      listeners.current.add(listener);

      return () => listeners.current.delete(listener);
    }, []);

    useEffect(() => {
      if ('value' in props && !isEqual(props.value, state.current)) {
        setSnapshot(props.value);
      }
    }, ['value' in props ? props.value : undefined]);

    const contextValue = useMemo<ContextValue<T>>(
      () => ({
        getSnapshot,
        setSnapshot,
        subscribe
      }),
      [getSnapshot, setSnapshot, subscribe]
    );

    return <BaseProvider value={contextValue}>{children}</BaseProvider>;
  };

  BaseContext.Provider = SnapshotProvider as unknown as Provider<ContextValue<T>>;

  return BaseContext as unknown as SnapshotContext<T>;
};
