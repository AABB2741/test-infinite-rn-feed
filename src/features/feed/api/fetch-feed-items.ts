import { faker } from "@faker-js/faker";
import { Image } from "react-native";

import { getRandomVideoUrl } from "@/lib/faker/video-url";
import type { FeedItem } from "@/schemas/feed-item";
import type { ImageFeedItem } from "@/schemas/feed-item/image";
import type { VideoFeedItem } from "@/schemas/feed-item/video";

interface FetchFeedItemsRequest {
  itemsCount: number;
}

interface FetchFeedItemsRequestResponse {
  feedItems: FeedItem[];
}

const mediaTypes = ["image", "video"] as const;

export async function fetchFeedItems({
  itemsCount,
}: FetchFeedItemsRequest): Promise<FetchFeedItemsRequestResponse> {
  const feedItems: FeedItem[] = await Promise.all(
    Array.from({ length: itemsCount }).map(async () => {
      const mediaType = faker.helpers.arrayElement(mediaTypes);

      if (mediaType === "image") {
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
      } else {
        const videoUrl = getRandomVideoUrl();

        const item: VideoFeedItem = {
          id: faker.string.uuid(),
          type: "video",
          author: {
            id: faker.string.uuid(),
            name: faker.person.fullName(),
          },
          videoUrl,
        };

        return item;
      }
    }),
  );

  return { feedItems };
}
