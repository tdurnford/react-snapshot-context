import React, { type FC } from 'react';
import { useNumber } from '../hooks/useNumber';

export const Number: FC = () => {
  const [number] = useNumber();

  return (
    <div>
      <div>
        <strong>The number snapshot value is:</strong> {number}
      </div>
    </div>
  );
};
