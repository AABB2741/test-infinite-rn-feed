import { faker } from "@faker-js/faker";

import type { CustomFeedItem } from "@/schemas/feed-item/custom";
import { AdCustomFeedItem } from "./components/custom-feed-items/ad";
import { HalloweenMessage } from "./components/custom-feed-items/halloween-message";

interface CustomItem {
  criteria: () => Promise<boolean> | boolean;
  content: Omit<CustomFeedItem, "id">;
}

export const CUSTOM_FEED_ITEMS: Record<string, CustomItem> = {
  ad: {
    criteria: () => Math.random() >= 0.5,
    content: {
      type: "custom",
      render: AdCustomFeedItem,
    },
  },
  halloween_message: {
    criteria: () => {
      const d = new Date();
      return d.getDate() === 3 && d.getMonth() === 10;
    },
    content: {
      type: "custom",
      render: HalloweenMessage,
    },
  },
};

export async function getCustomFeedItems(count: number) {
  const feedItems: CustomFeedItem[] = [];

  while (feedItems.length < count) {
    for (const key in CUSTOM_FEED_ITEMS) {
      if (await CUSTOM_FEED_ITEMS[key].criteria()) {
        feedItems.push({
          ...CUSTOM_FEED_ITEMS[key].content,
          id: faker.string.uuid(),
        });

        if (feedItems.length >= count) {
          break;
        }
      }
    }
  }

  return { feedItems };
}
