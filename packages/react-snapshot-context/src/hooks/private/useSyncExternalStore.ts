import { useEffect, useState } from 'react';
import { GetSnapshot, Selector, Subscribe } from '../types';

// Overload when selector is not provided
export function useSyncExternalStore<Snapshot>(subscribe: Subscribe, getSnapshot: GetSnapshot<Snapshot>): Snapshot;

// Overload when selector is provided
export function useSyncExternalStore<Snapshot, Selection>(
  subscribe: Subscribe,
  getSnapshot: GetSnapshot<Snapshot>,
  selector?: Selector<Snapshot, Selection>
): Selection;

// Implementation
export function useSyncExternalStore<Snapshot, Selection>(
  subscribe: Subscribe,
  getSnapshot: GetSnapshot<Snapshot>,
  selector?: Selector<Snapshot, Selection>
): Snapshot | Selection {
  const internalSelector = selector ?? ((snapshot: Snapshot) => snapshot);
  const [local, setLocal] = useState(() => internalSelector(getSnapshot()));

  useEffect(() => {
    return subscribe(() => {
      setLocal(internalSelector(getSnapshot()));
    });
  });

  return local;
}
