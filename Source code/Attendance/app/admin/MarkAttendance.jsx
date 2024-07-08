import { View, Text, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import FormField from "../../components/FormField";
import CustomDropdown from "../../components/CustomDropDown";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "expo-router";
import { getAllAttendances, editAttendance } from "../../context/api";

const MarkAttendance = () => {
  const navigation = useNavigation();
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(""); // Track selected session string
  const [form, setForm] = useState({
    matricule: "",
  });

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await getAllAttendances();
      if (response.status === 200) {
        setSessions(response.data);
      } else {
        Alert.alert("Error", "Failed to fetch sessions");
      }
    } catch (error) {
      console.error("Error fetching sessions", error);
      Alert.alert("Error", "Failed to fetch sessions");
    }
  };

  const parseSessionString = (sessionString) => {
    const parts = sessionString.split(" - ");
    return {
      courseId: parts[0],
      date: parts[1],
      startTime: parts[2],
    };
  };

  const handleMarkAttendance = async () => {
    if (!selectedSession || !form.matricule) {
      Alert.alert(
        "Error",
        "Please select a session and enter student matricule"
      );
      return;
    }

    const parsedSession = parseSessionString(selectedSession);

    try {
      const response = await editAttendance(
        parsedSession.courseId,
        parsedSession.date,
        parsedSession.startTime,
        form.matricule
      );
      if (response.status === 200) {
        Alert.alert("Success", "Attendance marked successfully!");
        console.log(
          parsedSession.courseId,
          parsedSession.date,
          parsedSession.startTime,
          form.matricule
        );
        navigation.goBack(); // Navigate back to Dashboard after success
      } else {
        Alert.alert("Error", "Failed to mark attendance");
      }
    } catch (error) {
      console.error("Error marking attendance", error);
      Alert.alert("Error", "Failed to mark attendance. Please try again.");
      console.log(
        parsedSession.courseId,
        parsedSession.date,
        parsedSession.startTime,
        form.matricule
      );

    }
  };

  return (
    <View>
      <FormField
        title="Matricule"
        placeholder="Enter Student matricule Number"
        value={form.matricule}
        handleChangeText={(e) => setForm({ ...form, matricule: e })}
        otherStyles="mt-5"
      />

      <Text>Select Session</Text>
      <CustomDropdown
        title="Select Session"
        data={sessions.map(
          (session) =>
            `${session.courseId} - ${session.date} - ${session.startTime}`
        )}
        placeholder=" Select Session"
        onSelect={setSelectedSession} // Update selectedSession state with the selected session string
      />

      <CustomButton title="Mark" handlepress={handleMarkAttendance} />
    </View>
  );
};

export default MarkAttendance;
