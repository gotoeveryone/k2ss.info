import { error } from '@sveltejs/kit';
import type { PostItem } from 'types/post';

export const load = async ({ params }) => {
  const endpoint = `https://k2ss.info/wp-json/wp/v2/posts/${params.id}`;

  const response = await fetch(endpoint);

  if (response.ok) {
    const data = await response.json() as PostItem;
    return {
      post: data
    }
  }

  throw error(404, 'Not found');
};
