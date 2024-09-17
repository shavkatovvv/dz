const url = "http://localhost:3600/";

export const getDataCatalog = async () => {
  try {
    const res = await fetch(`${url}catalog`);
    const data = await res.json();
    return data;
  } catch (error) {
    return error.message;
  }
};

export const getData = async (name) => {
  try {
    const res = await fetch(`${url}${name}`);
    const data = await res.json();
    return data;
  } catch (error) {
    return error.message;
  }
};

export const getDatabanner = async () => {
  try {
    const res = await fetch(`${url}banners`);
    const data = await res.json();
    return data;
  } catch (error) {
    return error.message;
  }
};
