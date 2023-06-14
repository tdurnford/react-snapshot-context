import { SnapshotContext } from '../createSnapshotContext';
import { useSnapshotValue } from './useSnapshotValue';
import { useSetSnapshotValue } from './useSetSnapshotValue';

export function useSnapshot<Snapshot>(
  context: SnapshotContext<Snapshot>
): readonly [Snapshot, (updatedState: Snapshot | ((draft: Snapshot) => Snapshot | void)) => void] {
  const value = useSnapshotValue(context);
  const setValue = useSetSnapshotValue(context);

  return Object.freeze([value, setValue]);
}
