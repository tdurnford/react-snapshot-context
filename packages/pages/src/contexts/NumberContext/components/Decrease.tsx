import React, { type FC } from 'react';
import { useNumberApi } from '../hooks/useNumberApi';

export const Decrease: FC = () => {
  const { decrease } = useNumberApi();

  return <button onClick={decrease}>Decrease</button>;
};
