import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./welcome.style";
import { icons, SIZES, COLORS } from "../../../constants";
import { useCountryCode } from "../../../hooks/useCountryCode";

const searchTypes = ["country", "location"];

export default function Welcome() {
  const router = useRouter();
  const [activeSearchType, setActiveSearchType] = useState(searchTypes[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries, isValidSearch] = useCountryCode({ search: searchTerm });

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Find a webcam for your surfspot</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={text => setSearchTerm(text)}
            placeholder={`Search by ${activeSearchType}`}
          />
        </View>
        <TouchableOpacity
          style={isValidSearch ? styles.searchBtn : styles.searchBtnDisabled}
          onPress={() => {
            console.log("SEARCH BUTTON PRESSED");
          }}
          disabled={!isValidSearch}
        >
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={searchTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeSearchType, item)}
              onPress={() => {
                setActiveSearchType(item);
              }}
            >
              <Text style={styles.tabText(activeSearchType, item)}>
                {item.toUpperCase()}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
      {!isValidSearch && (
        <View
          style={{
            ...styles.tabsContainer
          }}
        >
          <FlatList
            data={countries}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.tab(activeSearchType, item)}
                onPress={() => {
                  setSelectedCountry(item.name);
                  setSearchTerm(item.name);
                }}
              >
                <Text style={styles.tabText(selectedCountry, item.name)}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.code}
            horizontal
          />
        </View>
      )}
    </View>
  );
}
