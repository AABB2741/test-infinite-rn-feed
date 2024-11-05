import { faker } from "@faker-js/faker";

import type { PostComment } from "@/schemas/post/comment";

interface FetchPostCommentsRequest {
  limit?: number;
}

// TODO: Add video or image on comments
interface FetchPostCommentsResponse {
  postComments: PostComment[];
}

export async function fetchPostComments({
  limit = 10,
}: FetchPostCommentsRequest): Promise<FetchPostCommentsResponse> {
  const postComments: PostComment[] = Array.from({ length: limit }).map(() => ({
    id: faker.string.uuid(),
    author: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
    },
    interactions: {
      likesCount: faker.number.int({ max: 10_000 }),
      dislikesCount: faker.number.int({ max: 10_000 }),
      repliesCount: faker.number.int({ max: 10_000 }),
    },
    createdAt: faker.date.anytime(),
    message: faker.lorem.sentences(),
  }));

  return { postComments };
}
