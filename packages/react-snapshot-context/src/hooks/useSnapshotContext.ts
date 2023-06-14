import { type Context, useContext } from 'react';

import { ContextValue, SnapshotContext } from '../createSnapshotContext';

export function useSnapshotContext<Snapshot>(context: SnapshotContext<Snapshot>): ContextValue<Snapshot> {
  return useContext(context as unknown as Context<Snapshot>) as unknown as ContextValue<Snapshot>;
}
