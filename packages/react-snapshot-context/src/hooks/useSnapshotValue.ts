import { SnapshotContext } from '../createSnapshotContext';
import { useSyncExternalStore } from './private/useSyncExternalStore';
import { Selector } from './types';
import { useSnapshotContext } from './useSnapshotContext';

export function useSnapshotValue<Snapshot>(context: SnapshotContext<Snapshot>): Snapshot;

export function useSnapshotValue<Snapshot, Selection>(
  context: SnapshotContext<Snapshot>,
  selector: Selector<Snapshot, Selection>
): Selection;

export function useSnapshotValue<Snapshot>(
  context: SnapshotContext<Snapshot>,
  selector?: Selector<Snapshot, Selection>
): Snapshot | Selection {
  const { getSnapshot, subscribe } = useSnapshotContext(context);

  return useSyncExternalStore(subscribe, getSnapshot, selector);
}
