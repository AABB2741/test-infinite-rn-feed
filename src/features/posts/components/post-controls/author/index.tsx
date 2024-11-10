import { Image, Text, View } from "react-native";

import { styles } from "./styles";

interface AuthorPostControlProps {
  avatarUrl: string;
  name: string;
}

export function AuthorPostControl({ avatarUrl, name }: AuthorPostControlProps) {
  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{ uri: avatarUrl }} />

      <Text numberOfLines={1} style={styles.name}>
        {name}
      </Text>
    </View>
  );
}
