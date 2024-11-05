import { useCallback, useEffect, useState } from "react";
import {
  useWindowDimensions,
  View,
  type ListRenderItemInfo,
} from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";

import { Loading } from "@/components/loading";
import type { Post } from "@/schemas/post";

import { Indicator } from "@/components/indicator";
import { fetchPosts } from "@/features/feed/api/fetch-posts";
import { PostRenderer } from "@/features/feed/components/post-renderer";
import { getRandomCustomPost } from "@/features/feed/get-random-custom-post";
import { styles } from "./styles";

export function Feed() {
  const { width: windowWidth } = useWindowDimensions();

  const [feedIndex, setFeedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<Post[] | null>(null);

  const loadMorePosts = useCallback(async () => {
    console.log("Carregando itens do feed...");
    setIsLoading(true);

    const { posts } = await fetchPosts({
      itemsCount: 10,
    });

    const newPosts = [...posts];

    const customPost = await getRandomCustomPost();

    if (customPost) {
      newPosts.push(customPost);
    }

    setItems((prevState) =>
      prevState ? [...prevState, ...newPosts] : newPosts,
    );
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const shouldLoadMoreItems = !items || items.length - feedIndex <= 3;

    if (shouldLoadMoreItems) {
      loadMorePosts();
    }
  }, [feedIndex, items, isLoading]);

  if (!items) {
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
        <SwiperFlatList
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
        />
      </View>
      {isLoading && feedIndex + 1 === items.length && (
        <Indicator.Container position="absolute">
          <Indicator.Text>
            Estamos carregando os próximos itens...
          </Indicator.Text>
        </Indicator.Container>
      )}
    </>
  );
}
