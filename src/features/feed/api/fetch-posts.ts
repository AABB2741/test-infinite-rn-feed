import { faker } from "@faker-js/faker";
import { Image } from "react-native";

import { getRandomVideoUrl } from "@/lib/faker/video-url";
import type { Post } from "@/schemas/post";
import type { ImagePost } from "@/schemas/post/image";
import type { InteractablePost } from "@/schemas/post/interactable";
import type { VideoPost } from "@/schemas/post/video";

interface FetchPostsRequest {
  itemsCount: number;
}

interface FetchPostsRequestResponse {
  posts: Post[];
}

const mediaTypes = ["image", "video"] as const;

export async function fetchPosts({
  itemsCount,
}: FetchPostsRequest): Promise<FetchPostsRequestResponse> {
  const posts: Post[] = await Promise.all(
    Array.from({ length: itemsCount }).map(async () => {
      const interactions: InteractablePost = {
        likesCount: faker.number.int({ max: 1_000_000 }),
        dislikesCount: faker.number.int({ max: 1_000_000 }),
        commentsCount: faker.number.int({ max: 1_000_000 }),
      };
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

        const item: ImagePost = {
          ...interactions,
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

        const item: VideoPost = {
          ...interactions,
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

  return { posts };
}
