import React, { useState, useEffect } from "react";
import { View, Alert, StyleSheet, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import CustomButton from "../../components/CustomButton";
import CustomDropdown from "../../components/CustomDropDown";
import { getAllSessions } from "../../context/api"; // Ensure this is correctly imported

const InitiateAttendance = () => {
  const navigation = useNavigation();
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState("");
  const timeLimits = [1, 5, 10, 15, 20, 25, 30];
  const [selectedTimeLimit, setSelectedTimeLimit] = useState("");

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await getAllSessions();
      if (response.status === 200) {
        setSessions(response.data);
      } else {
        Alert.alert('Error', 'Failed to fetch sessions');
      }
    } catch (error) {
      console.error('Error fetching sessions', error);
      Alert.alert('Error', 'Failed to fetch sessions');
    }
  };

  const formatTime = (time) => {
    const date = new Date(`1970-01-01T${time}Z`);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const handleInitiate = () => {
    if (!selectedSession || !selectedTimeLimit) {
      Alert.alert("Error", "Please select a session and time limit");
      return;
    }
    const session = sessions.find(session => 
      `${session.courseId} - ${session.date} ${formatTime(session.startTime)}-${formatTime(session.endTime)}` === selectedSession
    );
    if (session) {
      navigation.navigate("attend", { selectedTimeLimit, courseId: session.courseId, date: session.date, startTime: session.startTime });
      console.log(session.courseId);
    } else {
      Alert.alert("Error", "Session not found");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <CustomDropdown
          title="Select Session"
          data={sessions.map(session => `${session.courseId} - ${session.date} ${formatTime(session.startTime)}-${formatTime(session.endTime)}`)}
          placeholder=" Select Session"
          onSelect={setSelectedSession}
        />
        <CustomDropdown
          title="Select Time Limit"
          data={timeLimits.map(limit => `${limit} minutes`)}
          placeholder="Set Time Limit"
          onSelect={(item) => setSelectedTimeLimit(parseInt(item))}
        />
        <CustomButton
          title="Initiate"
          handlepress={handleInitiate}
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
