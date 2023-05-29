import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from "react-native";
import { useRouter } from "expo-router";
import * as Location from "expo-location";

import styles from "./nearbyspots.style";
import { COLORS, SIZES } from "../../../constants";
import NearbySpotCard from "../../common/cards/nearby/NearbySpotCard";
import { useFetchSpots } from "../../../hooks/useFetchSpots";

export default function NearbySpots() {
  const [locationLoading, setLocationLoading] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [location, setLocation] = useState(null);

  const { data, error, loading } = useFetchSpots({
    skip: !location,
    coordinates: location
      ? {
          long: location.coords.longitude,
          lat: location.coords.latitude
        }
      : undefined
  });

  useEffect(() => {
    (async () => {
      setLocationLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationError("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLocationLoading(false);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby spots</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {loading || locationLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error | locationError ? (
          <Text>"Something went wrong!"</Text>
        ) : (
          <View>
            <FlatList
              data={data}
              renderItem={({ item }) => <NearbySpotCard spot={item} />}
              keyExtractor={item => item?.id}
              contentContainerStyle={{ columnGap: SIZES.medium }}
              horizontal
            />
          </View>
        )}
      </View>
    </View>
  );
}
