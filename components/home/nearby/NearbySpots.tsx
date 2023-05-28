import { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

import styles from "./nearbyspots.style";
import { COLORS, SIZES } from "../../../constants";
import NearbySpotCard from "../../common/cards/nearby/NearbySpotCard";
import { FlatList } from "react-native-gesture-handler";

export default function NearbySpots() {
  const isLoading = false;
  const error = false;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby spots</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={[1, 2, 3, 4, 5]}
            renderItem={({ item }) => <NearbySpotCard item={item} />}
            keyExtractor={item => item?.spot_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
}
