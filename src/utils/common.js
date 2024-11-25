export const suffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

export const bildUrl = (url, params) => {
  let urlWithParams = url;
  Object.entries(params).forEach(([key, value], i) => {
    const sign = !i ? "?" : "&";
    urlWithParams += `${sign}${key}=${value}`;
  });
  return urlWithParams;
};
