import React from "react";
import { TouchableOpacity, Image } from "react-native";

import styles from "./screenheader.style";

interface Props {
  iconUrl?: string;
  dimension?: string;
  handlePress?: () => void;
}

const ScreenHeaderBtn = ({
  iconUrl,
  dimension = "100%",
  handlePress = () => {}
}: Props) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image
        source={iconUrl}
        resizeMode="cover"
        style={styles.btnImg(dimension)}
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
