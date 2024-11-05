import { faker } from "@faker-js/faker";

import type { CustomFeedItem } from "@/schemas/feed-item/custom";

import { ad } from "./components/custom-feed-items/ad";
import { halloween_message } from "./components/custom-feed-items/halloween-message";

export interface CustomItem {
  criteria: () => Promise<boolean> | boolean;
  generateId?: () => string;
  content: Omit<CustomFeedItem, "id">;
  canRepeat: boolean;
}

export const CUSTOM_FEED_ITEMS: Record<string, CustomItem> = {
  ad,
  halloween_message,
};

export async function getRandomCustomFeedItem() {
  for (const key in CUSTOM_FEED_ITEMS) {
    const feedItem = CUSTOM_FEED_ITEMS[key];
    if (await feedItem.criteria()) {
      return {
        ...feedItem.content,
        id: feedItem.generateId?.() ?? faker.string.uuid(),
      };
    }
  }
}
