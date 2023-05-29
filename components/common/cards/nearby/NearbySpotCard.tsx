import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./nearbyspotcard.style";

interface Spot {
  id: string;
  title: string;
  url: string;
  image: string;
}
interface Props {
  spot: Spot;
  handleCardPress: () => void;
}

export default function NearbySpotCard({ spot, handleCardPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={handleCardPress}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{ uri: spot.image }}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={styles.spotName} numberOfLines={3}>
        {spot.title}
      </Text>
    </TouchableOpacity>
  );
}
