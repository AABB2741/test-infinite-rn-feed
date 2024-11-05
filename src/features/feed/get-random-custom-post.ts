import { faker } from "@faker-js/faker";

import type { CustomPost } from "@/schemas/post/custom";

import { ad } from "./components/custom-posts/ad";
import { halloween_message } from "./components/custom-posts/halloween-message";

export const CUSTOM_POSTS: Record<string, Omit<CustomPost, "id">> = {
  ad,
  halloween_message,
};

export async function getRandomCustomPost(): Promise<CustomPost | null> {
  for (const key in CUSTOM_POSTS) {
    const post = CUSTOM_POSTS[key];
    if (await post.criteria()) {
      return { ...post, id: faker.string.uuid() };
    }
  }

  return null;
}
