import React, { useEffect, useState } from "react";
import {
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { Colors } from "../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getNoteUsingId } from "../hooks/getNote.js";

const handleHead = ({ tintColor }) => (
  <View
    style={{
      height: 25,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <MaterialCommunityIcons
      name="format-header-1"
      color={tintColor}
      size={25}
    />
  </View>
);
const textEditor = ({ setRichtext, noteId }) => {
  const richText = React.useRef();
  const [initialNote, setInitialNote] = useState(null);
  useEffect(() => {
    if (noteId) {
      const fetchNote = async () => {
        const noteDesc = await getNoteUsingId(noteId);
        setInitialNote(noteDesc.description);
      };
      fetchNote();
    }
  }, [noteId]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <RichEditor
            ref={richText}
            editorStyle={{
              backgroundColor: "transparent",
              color: "white",
            }}
            placeholder="Start typing here..."
            style={{ paddingHorizontal: 10 }}
            onChange={(text) => {
              setRichtext(text);
            }}
            initialContentHTML={initialNote}
          />
        </KeyboardAvoidingView>
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RichToolbar
          editor={richText}
          style={styles.editorTools}
          actions={[
            actions.setBold,
            actions.heading1,
            actions.setItalic,
            actions.setUnderline,
            actions.insertOrderedList,
            actions.checkboxList,
            actions.insertImage,
          ]}
          iconMap={{
            [actions.heading1]: handleHead,
          }}
          selectedIconTint={"yellow"}
          iconTint={"lightgrey"}
          iconSize={23}
        />
        <View style={styles.addToGroup}>
          <MaterialCommunityIcons name="tag" size={25} color={"white"} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default textEditor;

const styles = StyleSheet.create({
  editorTools: {
    backgroundColor: Colors.primaryColor,
    height: 50,
    borderTopRightRadius: 30,
    borderBottomEndRadius: 30,
    paddingHorizontal: 15,
  },
  addToGroup: {
    width: 50,
    height: 50,
    backgroundColor: Colors.primaryColor,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});
