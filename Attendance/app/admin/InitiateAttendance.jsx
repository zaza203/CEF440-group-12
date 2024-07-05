import React, { useState, useEffect, useContext } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import CustomButton from "../../components/CustomButton";
import CustomDropdown from "../../components/CustomDropDown";
import { getAllSessions } from "../../context/api"; // Ensure this is correctly imported
import { AuthContext } from "../../context/AuthContext";

const InitiateAttendance = () => {
  const navigation = useNavigation();
  const { state } = useContext(AuthContext);
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState("");
  const timeLimits = [5, 10, 15, 20, 25, 30];
  const [selectedTimeLimit, setSelectedTimeLimit] = useState("");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await getAllSessions();
        if (Array.isArray(response)) {
          setSessions(response);
        } else {
          console.error("Fetched data is not an array:", response);
        }
      } catch (error) {
        console.error("Error fetching sessions: ", error);
      }
    };

    fetchSessions();
  }, []);

  const handleInitiate = () => {
    if (!selectedSession || !selectedTimeLimit) {
      Alert.alert("Error", "Please select a session and time limit");
      return;
    }
    Alert.alert("Success", "Session added successfully");
    navigation.navigate("confirmFingerprint");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <CustomDropdown
          title="Select Session"
          data={sessions.map(session => `${session.courseId} - ${session.date} ${session.startTime}-${session.endTime}`)}
          placeholder="Session"
          onSelect={setSelectedSession}
        />
        <CustomDropdown
          title="Select Time Limit"
          data={timeLimits.map(limit => `${limit} minutes`)}
          placeholder="Time Limit"
          onSelect={(item) => setSelectedTimeLimit(parseInt(item))}
        />
        <CustomButton
          title="Initiate"
          handlePress={handleInitiate}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default InitiateAttendance;
