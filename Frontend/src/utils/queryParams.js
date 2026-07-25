// filepath: src/utils/queryParams.js
// Build URL query strings and parse them safely.
export const buildQueryString = (params = {}) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') search.append(k, v);
  });
  return search.toString();
};

export const parseQueryString = (search) => Object.fromEntries(new URLSearchParams(search));
