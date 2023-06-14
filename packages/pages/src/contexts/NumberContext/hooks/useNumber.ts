import { useSnapshot } from 'react-snapshot-context';
import { NumberContext } from '..';

export const useNumber = () => {
  return useSnapshot(NumberContext);
};
