import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    maxWidth: 150
  },
  logoContainer: {
    width: 150,
    height: 130,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 8
  },
  logoImage: {
    width: "180%",
    height: "180%"
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium
  },
  spotName: {
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: COLORS.primary
  },
  jobType: {
    fontSize: SIZES.small + 2,
    fontFamily: "DMRegular",
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize"
  }
});

export default styles;
