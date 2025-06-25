// src/hooks/useInput.js
import { useState } from 'react';

export function useInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);

  function onChange(event) {
    setValue(event.target.value);
  }

  return {
    value,  
    onChange,
  };
}
