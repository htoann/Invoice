const getLocalStorage = (key) => {
  const data = localStorage.getItem(key);

  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
};

const setLocalStorage = (key, value) => {
  const stringify = typeof value !== 'string' ? JSON.stringify(value) : value;
  return localStorage.setItem(key, stringify);
};

const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export { getLocalStorage, setLocalStorage, removeLocalStorage };
