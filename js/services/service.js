const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    body: data,
    headers: {
      "Content-type": "application/json",
    },
  });
  return await res.json();
};

const getResources = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Error ${res.status}`);
  }

  return await res.json();
};

export { postData, getResources };
