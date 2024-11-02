import { useCallback, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
  type ListRenderItemInfo,
} from "react-native";

import { Loading } from "@/components/loading";

import { resize } from "@/utils/resize";
import SwiperFlatList from "react-native-swiper-flatlist";
import {
  fetchFeedItems,
  type FeedItem,
} from "../features/feed/api/fetch-feed-items";
import { styles } from "./styles";

interface FeedContent extends FeedItem {
  width: number;
  height: number;
}

export function Feed() {
  const { width: windowWidth } = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [feedContent, setFeedContent] = useState<FeedContent[] | null>(null);

  const loadFeedItems = useCallback(async () => {
    console.log("Carregando itens do feed");

    const { feedItems } = await fetchFeedItems({
      itemsCount: 10,
    });

    const content: FeedContent[] = await Promise.all(
      feedItems.map(async (feedItem) => {
        const dimensions = await new Promise<{ width: number; height: number }>(
          (resolve, reject) => {
            Image.getSize(
              feedItem.contentUrl,
              (width, height) => resolve({ width, height }),
              reject,
            );
          },
        );

        return {
          ...feedItem,
          width: dimensions.width,
          height: dimensions.height,
        } satisfies FeedContent;
      }),
    );

    setFeedContent((prevState) => {
      if (!prevState) {
        return content;
      }

      return [...prevState, ...content];
    });
  }, []);

  useEffect(() => {
    loadFeedItems();
  }, []);

  if (!feedContent) {
    return <Loading message="Carregando o feed..." />;
  }

  return (
    <View style={styles.container}>
      <SwiperFlatList
        index={index}
        onChangeIndex={({ index }) => {
          setIndex(index);

          const shouldLoadMoreItems = feedContent.length - index <= 3;
          if (shouldLoadMoreItems) {
            loadFeedItems();
          }
        }}
        data={feedContent}
        renderItem={({ item, index }: ListRenderItemInfo<FeedContent>) => {
          const { newWidth, newHeight } = resize({
            from: {
              width: item.width,
              height: item.height,
            },
            to: {
              width: windowWidth,
            },
          });

          return (
            <View
              style={[styles.contentContainer, { width: windowWidth }]}
              key={item.id}
            >
              <Text style={styles.contentAuthor}>
                {item.author.name} - Index: {index}
              </Text>

              <ScrollView style={styles.contentImageContainer}>
                <Image
                  style={styles.contentImage}
                  source={{
                    uri: item.contentUrl,
                    width: newWidth,
                    height: newHeight,
                  }}
                />
              </ScrollView>
            </View>
          );
        }}
      />
    </View>
  );
}
