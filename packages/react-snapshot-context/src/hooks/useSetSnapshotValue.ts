import { SnapshotContext } from '../createSnapshotContext';
import { useSnapshotContext } from './useSnapshotContext';

export function useSetSnapshotValue<Snapshot>(context: SnapshotContext<Snapshot>) {
  const { setSnapshot } = useSnapshotContext(context);

  return setSnapshot;
}
