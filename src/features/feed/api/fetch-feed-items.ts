import { faker } from "@faker-js/faker";

interface FetchFeedItemsRequest {
  itemsCount: number;
}

interface FetchFeedItemsRequestResponse {
  feedItems: FeedItem[];
}

export interface FeedItem {
  id: string;
  author: {
    name: string;
    id: string;
  };
  type: "image";
  contentUrl: string;
}

export async function fetchFeedItems({
  itemsCount,
}: FetchFeedItemsRequest): Promise<FetchFeedItemsRequestResponse> {
  const feedItems: FeedItem[] = Array.from({ length: itemsCount }).map(() => ({
    id: faker.string.uuid(),
    author: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
    },
    type: "image",
    contentUrl: faker.image.url(),
  }));

  return { feedItems };
}
