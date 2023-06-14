import { useSetSnapshotValue } from 'react-snapshot-context';
import { NumberContext } from '..';
import { useCallback } from 'react';

export const useNumberApi = () => {
  const setNumber = useSetSnapshotValue(NumberContext);

  const increase = useCallback(() => {
    setNumber(draft => ++draft);
  }, []);

  const decrease = useCallback(() => {
    setNumber(draft => --draft);
  }, []);

  return Object.freeze({
    increase,
    decrease,
    setNumber
  });
};
