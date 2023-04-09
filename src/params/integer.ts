// trailingSlash を考慮して、末尾の / は許容する
export const match = (param) => /^\d+\/?$/.test(param);
