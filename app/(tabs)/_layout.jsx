import { View, StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Colors } from "../../constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const tabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          bottom: 10,
          marginHorizontal: 15,
          backgroundColor: Colors.primaryColor,
          height: 66,
          borderRadius: 20,
          elevation: 0,
          borderTopWidth: 0,
          paddingTop: 13,
          zIndex: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              size={26}
              color={"white"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "calendar-text" : "calendar-text-outline"}
              size={26}
              color={"white"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.addNotes}>
              <MaterialCommunityIcons name="plus" size={38} color={"black"} />
            </View>
          ),
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "cog" : "cog-outline"}
              size={26}
              color={"white"}
            />
          ),
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "account" : "account-outline"}
              size={26}
              color={"white"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default tabLayout;

const styles = StyleSheet.create({
  addNotes: {
    backgroundColor: Colors.addTabColor,
    width: 56,
    height: 50,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
