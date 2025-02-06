import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";

const width = Dimensions.get("window").width;

const SliderItem = ({ item, index, scrollX }) => {
  const rstyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollX.value,
        [(index - 1) * width, index * width, (index + 1) * width],
        ["red", "blue", "red"]
      ),
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.25, 0, width * 1.25]
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.container]}>
      <Animated.View style={[styles.box, rstyle]}></Animated.View>
      <Text>{item.title}</Text>
    </Animated.View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 300,
    marginTop: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
  },
  box: {
    width: 270,
    height: 260,
    backgroundColor: "plum",
  },
});
