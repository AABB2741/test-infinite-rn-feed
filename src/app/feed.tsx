import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";

import { Loading } from "@/components/loading";
import { fetchPosts } from "@/features/posts/api/fetch-posts";
import type { Post } from "@/schemas/post";

import { PostsFeed } from "@/features/posts/components/posts-feed";
import { styles } from "./styles";

export function Feed() {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[] | null>(null);

  const loadMorePosts = useCallback(async () => {
    const { posts: newPosts } = await fetchPosts();

    setPosts((prevState) =>
      prevState ? [...prevState, ...newPosts] : newPosts,
    );
  }, []);

  useEffect(() => {
    loadMorePosts();
  }, []);

  if (!posts) {
    return (
      <Loading
        message="Carregando o feed..."
        tooLongLoading={{
          10000: "Isso está demorando um pouco mais do que o esperado...",
          20000: "Ainda estamos aqui. Aguenta mais um pouquinho...",
          30000: "Parece que tivemos um problema, que tal reiniciar o app?",
        }}
      />
    );
  }

  return (
    <>
      <View style={styles.container}>
        <PostsFeed
          onRequestMorePosts={loadMorePosts}
          isNextPageAvailable={!isLoading}
          posts={posts}
        />
        {/* <SwiperFlatList
          index={feedIndex}
          onChangeIndex={({ index }) => setFeedIndex(index)}
          data={items}
          renderItem={({ item, index }: ListRenderItemInfo<Post>) => {
            return (
              <View
                style={[styles.contentContainer, { width: windowWidth }]}
                key={item.id}
              >
                {item.type === "image" && <PostRenderer.Image {...item} />}
                {item.type === "video" && (
                  <PostRenderer.Video
                    {...item}
                    isVisible={index === feedIndex}
                  />
                )}
                {item.type === "custom" && item.render()}
              </View>
            );
          }}
        /> */}
      </View>
    </>
  );
}
