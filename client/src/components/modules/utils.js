// REGEX
export const regExps = {
  personnel: new RegExp('^[a-z]+[.]{1}[a-z]+$'),
  student: new RegExp('^\\d{10}$'),

  tel: new RegExp('^\\d{10}$'),
  email: new RegExp('^([a-z0-9._:$!%-]+@[a-z0-9.-]+[.]{1}[a-z]+)$'),

  edoc: new RegExp('^https://docs.psu.ac.th/view/[\\w\\d-]+$'),
};
export const checkPSU = (username) =>
  regExps.personnel.test(username)
    ? 'Personnel'
    : regExps.student.test(username)
      ? 'Student'
      : undefined;

// ARRAYS AND OBJECTS:
export const getList = (lists, id, key = 'id') =>
  lists.find((list) => list[key] === id);
export const getLists = (lists, ids, key = 'id') =>
  lists.filter((list) => ids.includes(list[key]));

// URL:
export const joinPaths = (...args) => {
  let query = '';
  let parts = [...args];

  // Extract query parameters if last arg is an object or URLSearchParams
  const last = parts[parts.length - 1];
  if (last && typeof last === 'object' && !(last instanceof String)) {
    const params =
      last instanceof URLSearchParams ? last : new URLSearchParams(last);
    query = params.toString();
    parts.pop(); // Remove query object
  }

  // Join all parts, remove leading/trailing slashes to avoid duplication
  const [base, ...rest] = parts;
  const url = [
    base.replace(/\/+$/, ''),
    ...rest.map((p) => p.replace(/^\/+|\/+$/g, '')),
  ].join('/');

  return query ? `${url}?${query}` : url;
};

export const isSameUrlPath = (a, b) => {
  const clean = (url) => {
    try {
      const u = new URL(url, 'http://dummy'); // fallback base for relative paths
      return u.pathname.replace(/\/+$/, ''); // remove trailing slashes
    } catch {
      return url
        .replace(/\?.*$/, '') // remove ?query
        .replace(/#.*$/, '') // remove #fragment
        .replace(/\/+$/, ''); // remove trailing slash
    }
  };

  return clean(a) === clean(b);
};

export const toSrc = (path) => (path ? joinPaths(VITE_baseURL + path) : '');

// USER:
export const toAdmin = (user) => ({
  psuId: user.staffId.trim(),
  name: {
    th: formatStr(`${user.staffNameThai} ${user.staffSnameThai}`),
    en: formatStr(`${user.staffNameEng} ${user.staffSnameEng}`),
  },

  campusId: user.campId,
  facId: user.facId,
  deptId: user.deptId,

  campusName: {
    th: formatStr(user.campNameThai),
    en: formatStr(user.campNameEng),
  },
  facName: {
    th: formatStr(user.facNameThai),
    en: formatStr(user.campNameEng),
  },
  deptName: {
    th: formatStr(user.deptNameThai),
    en: formatStr(user.campNameEng),
  },
});
