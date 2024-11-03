import { faker } from "@faker-js/faker";
import { Image } from "react-native";

import type { FeedItem } from "@/schemas/feed-item";
import type { ImageFeedItem } from "@/schemas/feed-item/image";

import { getCustomFeedItems } from "../get-custom-feed-items";

interface FetchFeedItemsRequest {
  itemsCount: number;
}

interface FetchFeedItemsRequestResponse {
  feedItems: FeedItem[];
}

export async function fetchFeedItems({
  itemsCount,
}: FetchFeedItemsRequest): Promise<FetchFeedItemsRequestResponse> {
  try {
    const feedItems: FeedItem[] = await Promise.all(
      Array.from({ length: itemsCount }).map(async () => {
        const imageUrl = faker.image.url();

        const [width, height] = await new Promise<[number, number]>(
          (resolve, reject) => {
            Image.getSize(
              imageUrl,
              (width, height) => resolve([width, height]),
              reject,
            );
          },
        );

        const item: ImageFeedItem = {
          id: faker.string.uuid(),
          type: "image",
          author: {
            id: faker.string.uuid(),
            name: faker.person.fullName(),
          },
          imageUrl,
          width,
          height,
        };

        return item;
      }),
    );

    const { feedItems: customFeedItems } = await getCustomFeedItems(1);

    return { feedItems: [...feedItems, ...customFeedItems] };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
