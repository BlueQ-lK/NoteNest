import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

const setting = () => {
  const [first, setfirst] = useState("");
  console.log(first);
  return (
    <View>
      <TextInput
        placeholder="type here..."
        onChangeText={setfirst}
        value={first}
      />
    </View>
  );
};

export default setting;

const styles = StyleSheet.create({});
