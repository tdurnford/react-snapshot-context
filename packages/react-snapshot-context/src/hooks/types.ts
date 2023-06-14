export type Unsubscribe = () => void;
export type Subscribe = (listener: () => void) => Unsubscribe;
export type GetSnapshot<Snapshot> = () => Snapshot;
export type Selector<Snapshot, Selection> = (snapshot: Snapshot) => Selection;
