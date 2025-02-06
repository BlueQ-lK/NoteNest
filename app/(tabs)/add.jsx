import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Colors } from "../../constants/Colors";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TextEditor from "../../components/textEditor";

const handleHead = ({ tintColor }) => (
  <Text style={{ color: tintColor }}>H1</Text>
);

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [ispin, setIspin] = useState(false);
  const [richTextDesc, setRichTextDesc] = useState();
  const route = useRoute();
  const noteId = route.params?.noteId;

  useEffect(() => {
    if (isFocused) {
      setModalVisible(true);
    }
  }, [isFocused]);

  const handleClose = () => {
    setRichTextDesc("");
    setIspin(false);
    setModalVisible(false);
    navigation.setParams({ noteId: null });
    navigation.navigate("index");
  };
  const addNote = async () => {
    try {
      if (richTextDesc) {
        const note = {
          id: noteId || Date.now(),
          description: richTextDesc,
          pinned: ispin,
        };
        let itemArray = [];
        const result = await AsyncStorage.getItem("notes");
        if (result !== null) {
          itemArray = JSON.parse(result);
          if (noteId) {
            const noteIndex = itemArray.findIndex((n) => n.id === noteId);
            itemArray[noteIndex] = note;
          } else {
            itemArray.push(note);
          }
          await AsyncStorage.setItem("notes", JSON.stringify(itemArray));
        } else {
          await AsyncStorage.setItem("notes", JSON.stringify([note]));
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
    }
  };
  const handlepinned = () => {
    setIspin(!ispin);
  };
  return (
    <KeyboardAvoidingView
      style={styles.mainEditArea}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Modal transparent={true} visible={modalVisible} onRequestClose={addNote}>
        <View style={styles.topOption}>
          <TouchableOpacity style={styles.backBtnField} onPress={addNote}>
            <MaterialCommunityIcons name="check" size={32} color={"white"} />
          </TouchableOpacity>
          <View style={styles.displayDate}>
            <Text style={{ color: "grey" }}>
              {new Date().toLocaleString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Text>
          </View>
          <TouchableHighlight style={styles.menuBtn} onPress={handlepinned}>
            <MaterialCommunityIcons
              name={ispin ? "pin" : "pin-outline"}
              size={25}
              color={"white"}
            />
          </TouchableHighlight>
        </View>
        {/* text editor code starts here */}
        <TextEditor setRichtext={setRichTextDesc} noteId={noteId} />
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainEditArea: {
    flex: 1,
    backgroundColor: "#1B1B1F",
  },
  topOption: {
    height: 60,
    marginHorizontal: 10,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backBtnField: {
    backgroundColor: Colors.primaryColor,
    height: "100%",
    width: 60,
    flexDirection: "row",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  menuBtn: {
    backgroundColor: Colors.primaryColor,
    width: 60,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  undoRedo: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 70,
    height: "100%",
    alignItems: "center",
  },
  displayDate: {
    paddingTop: 10,
  },
  titleBox: {
    width: "100%",
    height: 50,
    paddingHorizontal: 15,
  },
  titleInput: {
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
});

export default App;
