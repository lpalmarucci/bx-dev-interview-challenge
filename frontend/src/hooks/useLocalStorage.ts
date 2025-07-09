import {useCallback, useEffect, useMemo, useState} from "react";

const useLocalstorage = <T>(key: string, initialValue?: T) => {
  const getValueFromLocalstorage = useCallback(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch  {
      return initialValue;
    }
  }, [ initialValue, key]);

  const [storedValue, setStoredValue] = useState(getValueFromLocalstorage());

  useEffect(() => {
    const value = getValueFromLocalstorage();
    setStoredValue(value);
  }, [getValueFromLocalstorage]);

  return useMemo(() => {
    const setValue = (value: unknown) => {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      if (valueToStore !== storedValue) {
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    };
    return [storedValue, setValue];
  }, [storedValue, key]);
};

export default useLocalstorage;
