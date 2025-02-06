import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import SliderItem from "./SliderItem";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

const Test = ({ items }) => {
  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x;
  });

  return (
    <Animated.FlatList
      data={items}
      renderItem={({ item, index }) => (
        <SliderItem item={item} index={index} scrollX={scrollX} />
      )}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      pagingEnabled={true}
      onScroll={scrollHandler}
      removeClippedSubviews={false}
    />
  );
};

export default Test;

const styles = StyleSheet.create({});
