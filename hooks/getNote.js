import AsyncStorage from "@react-native-async-storage/async-storage";

export const getNoteUsingId = async (noteId) => {
    try {
        const result = await AsyncStorage.getItem("notes");
        const parsedItem = JSON.parse(result);
        const note = parsedItem.find((item) => item.id === noteId);
        return note;
      } catch (error) {
        console.log("Error: Fucntion retriveNoteData ", error);
      }
}