import { useState, useEffect } from "react";

export function useDebounce(initialValue = null, delay = 350) {
  const [value, setValue] = useState(initialValue);
  const [updatedValue, setUpdatedValue] = useState(initialValue);

  useEffect(() => {
    const delayledCall = setTimeout(() => setUpdatedValue(value), delay);
    return () => clearTimeout(delayledCall);
  }, [value, delay]);

  return [updatedValue, setValue];
}
