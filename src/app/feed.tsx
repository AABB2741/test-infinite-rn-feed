import { useCallback, useEffect, useState } from "react";
import {
  useWindowDimensions,
  View,
  type ListRenderItemInfo,
} from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";

import { Loading } from "@/components/loading";
import type { FeedItem } from "@/schemas/feed-item";

import { fetchFeedItems } from "@/features/feed/api/fetch-feed-items";
import { FeedItemRenderer } from "@/features/feed/components/feed-item-renderer";
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

    setItems((prevState) => {
      if (!prevState) {
        console.log(
          "Colocando itens no feed:",
          feedItems.map((item) => item.id.slice(0, 5)).join(", "),
        );
        return feedItems;
      }

      console.log("Adicionando itens no feed!");
      console.log(
        "Anteriores:",
        prevState.map((item) => item.id.slice(0, 5)).join(", "),
      );
      console.log(
        "Novos:",
        feedItems.map((item) => item.id.slice(0, 5)).join(", "),
      );
      return [...prevState, ...feedItems];
    });
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
    return <Loading message="Carregando o feed..." />;
  }

  return (
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
              {item.type === "custom" && item.render()}
            </View>
          );
        }}
      />
    </View>
  );
}