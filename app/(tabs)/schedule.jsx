import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Test from "../../components/test";
import testList from "../../assets/data.json";

const Schedule = () => {
  return (
    <View style={styles.container}>
      <Test items={testList} />
    </View>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
