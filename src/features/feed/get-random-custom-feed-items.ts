import { faker } from "@faker-js/faker";

import type { CustomFeedItem } from "@/schemas/feed-item/custom";

import { ad } from "./components/custom-feed-items/ad";
import { halloween_message } from "./components/custom-feed-items/halloween-message";

export const CUSTOM_FEED_ITEMS: Record<string, Omit<CustomFeedItem, "id">> = {
  ad,
  halloween_message,
};

export async function getRandomCustomFeedItem(): Promise<CustomFeedItem | null> {
  for (const key in CUSTOM_FEED_ITEMS) {
    const feedItem = CUSTOM_FEED_ITEMS[key];
    if (await feedItem.criteria()) {
      return { ...feedItem, id: faker.string.uuid() };
    }
  }

  return null;
}
