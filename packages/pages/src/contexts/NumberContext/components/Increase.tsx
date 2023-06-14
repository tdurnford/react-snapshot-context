import React, { type FC } from 'react';
import { useNumberApi } from '../hooks/useNumberApi';

export const Increase: FC = () => {
  const { increase } = useNumberApi();

  return <button onClick={increase}>Increase</button>;
};
