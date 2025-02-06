import {
  View,
  StyleSheet,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Button,
  Text,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import NotesBox from "../../components/notesBox";
import MasonryList from "@react-native-seoul/masonry-list";

const { width, height } = Dimensions.get("screen");

const index = () => {
  const [ViewAllNotes, setViewAllNotes] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [filterByImp, setfilterByImp] = useState(false);

  const loadItem = async () => {
    try {
      const items = await AsyncStorage.getItem("notes");
      const parsedItem = JSON.parse(items);
      let updatedItem2 = [];
      updatedItem2 = parsedItem;
      setViewAllNotes(updatedItem2.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadItem();
  }, [isFocused]);

  const loadDataToTextEditor = (noteId) => {
    navigation.navigate("add", { noteId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top Bar */}
        <View style={styles.homeTopBar}>
          <View style={styles.searchBarBg}>
            <MaterialCommunityIcons name="magnify" size={30} color={"white"} />
            <TextInput
              placeholder="Search your notes"
              style={styles.searchInput}
              placeholderTextColor={"gray"}
            />
            <View
              style={{
                height: 37,
                width: 1,
                backgroundColor: "gray",
                marginRight: 10,
                marginLeft: 5,
              }}
            />
            <TouchableOpacity style={styles.notification}>
              <MaterialCommunityIcons name="bell" size={23} color={"white"} />
            </TouchableOpacity>
          </View>
        </View>
        {/* filter by all and pinned */}
        <View style={styles.mainNotesBox}>
          <TouchableOpacity
            style={[
              styles.filterByImpStyle,
              filterByImp
                ? [{ width: 80 }, styles.filterByImpStyleInActive]
                : [{ width: 80 }, styles.filterByImpStyleActive],
            ]}
            onPress={() => setfilterByImp(false)}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "500",
                color: filterByImp ? "white" : "black",
              }}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterByImpStyle,
              filterByImp
                ? [{ width: 130 }, styles.filterByImpStyleActive]
                : [{ width: 130 }, styles.filterByImpStyleInActive],
            ]}
            onPress={() => setfilterByImp(true)}
          >
            <Text
              style={{
                color: filterByImp ? "black" : "white",
                fontSize: 15,
                fontWeight: "500",
              }}
            >
              Important
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 15 }}>
          <MasonryList
            data={
              filterByImp
                ? ViewAllNotes.filter((item) => item.pinned)
                : ViewAllNotes
            }
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => loadDataToTextEditor(item.id)}>
                <NotesBox item={item} index={index} />
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={[{ flex: 1, zIndex: -1 }, StyleSheet.absoluteFillObject]}
        ></View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryColor,
    flex: 1,
    paddingTop: Platform.OS === "android" ? 10 : 0,
    paddingHorizontal: 15,
  },
  homeTopBar: {
    width: "100%",
    height: 48,
  },
  searchBarBg: {
    backgroundColor: Colors.primaryColor,
    width: "100%",
    height: "100%",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  searchInput: {
    color: "white",
    width: "80%",
    height: "100%",
    marginLeft: 5,
  },
  impNotes: {
    width: "100%",
    height: height <= 800 ? 220 : 270,
  },
  emptyBoxContainer: {
    width: width,
    height: height <= 800 ? 220 : 270,
    marginLeft: 5,
  },
  emptyBox: {
    backgroundColor: "rgba(237, 231, 225, 0.1)",
    width: width - 40,
    height: height <= 800 ? 220 : 250,
    borderRadius: 16,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  ViewAllBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
  },
  pinText: {
    color: "white",
    fontSize: 27,
    fontWeight: "500",
    marginLeft: 5,
  },
  mainNotesBox: {
    height: 35,
    marginTop: 20,
    flexDirection: "row",
    width: 230,
    justifyContent: "space-between",
    marginLeft: 5,
  },
  filterByImpStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderRadius: 50,
  },
  filterByImpStyleActive: {
    backgroundColor: "white",
  },

  filterByImpStyleInActive: {
    borderWidth: 2,
    borderColor: "grey",
  },
});
