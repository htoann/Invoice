import Cookies from 'js-cookie';

const getCookie = (key) => {
  const data = Cookies.get(key);

  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
};

const setCookie = (key, value) => {
  const stringify = typeof value !== 'string' ? JSON.stringify(value) : value;
  return Cookies.set(key, stringify);
};

const removeItem = (key) => {
  Cookies.remove(key);
};

export { getCookie, setCookie, removeItem };
