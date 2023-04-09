import type { PostListItem } from 'types/post';

export const load = async () => {
  const endpoint = 'https://k2ss.info/wp-json/wp/v2/posts?context=embed';

  const response = await fetch(endpoint);
  const data = await response.json() as PostListItem[];
  return {
    posts: data
  }
};
