import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";

const { width, height } = Dimensions.get("screen");
const NotesBox = ({ item }) => {
  return (
    <View style={{ marginHorizontal: 20 }}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={{ color: "gray" }}>Date: 12 April 2024</Text>
          <Text style={{ color: "white" }}>{item.id}</Text>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            {item.title}
          </Text>
          <Text style={styles.desc}>{item.description}</Text>
        </View>
      </View>
    </View>
  );
};

export default NotesBox;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 20,
  },
  box: {
    backgroundColor: "#343434",
    width: width * 0.44,
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#525252",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  desc: {
    color: "white",
  },
});
