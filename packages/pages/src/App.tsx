import React from 'react';
import { NumberContext } from './contexts/NumberContext';
import { Number } from './contexts/NumberContext/components/Number';
import { Increase } from './contexts/NumberContext/components/Increase';
import { Decrease } from './contexts/NumberContext/components/Decrease';

const App = () => {
  return (
    <NumberContext.Provider value={0}>
      <Number />
      <Increase />
      <Decrease />
    </NumberContext.Provider>
  );
};

export default App;
