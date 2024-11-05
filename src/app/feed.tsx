import { useCallback, useEffect, useState } from "react";
import {
  useWindowDimensions,
  View,
  type ListRenderItemInfo,
} from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";

import { Loading } from "@/components/loading";
import type { FeedItem } from "@/schemas/feed-item";

import { Indicator } from "@/components/indicator";
import { fetchFeedItems } from "@/features/feed/api/fetch-feed-items";
import { FeedItemRenderer } from "@/features/feed/components/feed-item-renderer";
import { getRandomCustomFeedItem } from "@/features/feed/get-random-custom-feed-items";
import { styles } from "./styles";

export function Feed() {
  const { width: windowWidth } = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<FeedItem[] | null>(null);

  const loadMoreFeedItems = useCallback(async () => {
    console.log("Carregando itens do feed...");
    setIsLoading(true);

    const { feedItems } = await fetchFeedItems({
      itemsCount: 10,
    });

    const newFeedItems = [...feedItems];

    const customFeedItem = await getRandomCustomFeedItem();

    if (customFeedItem) {
      newFeedItems.push(customFeedItem);
    }

    setItems((prevState) =>
      prevState ? [...prevState, ...newFeedItems] : newFeedItems,
    );
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const shouldLoadMoreItems = !items || items.length - index <= 3;

    if (shouldLoadMoreItems) {
      loadMoreFeedItems();
    }
  }, [index, items, isLoading]);

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
      {isLoading && index + 1 === items.length && (
        <Indicator.Container position="absolute">
          <Indicator.Text>
            Estamos carregando os próximos itens...
          </Indicator.Text>
        </Indicator.Container>
      )}
      <View style={styles.container}>
        <SwiperFlatList
          index={index}
          onChangeIndex={({ index }) => setIndex(index)}
          data={items}
          renderItem={({ item, index }: ListRenderItemInfo<FeedItem>) => {
            return (
              <View
                style={[styles.contentContainer, { width: windowWidth }]}
                key={item.id}
              >
                {item.type === "image" && <FeedItemRenderer.Image {...item} />}
                {item.type === "video" && <FeedItemRenderer.Video {...item} />}
                {item.type === "custom" && item.render()}
              </View>
            );
          }}
        />
      </View>
    </>
  );
}
