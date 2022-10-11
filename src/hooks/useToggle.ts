import { useState, useCallback } from 'react';

export const useToggle = () => {
  const [toggle, setToggle] = useState(false);

  const onHandleToggle = useCallback(() => {
    setToggle((toggle) => !toggle);
  }, []);

  return { toggle, onHandleToggle };
};
