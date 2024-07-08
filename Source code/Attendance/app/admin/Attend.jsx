import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as LocalAuthentication from "expo-local-authentication";
import { useNavigation } from "expo-router";
import { AuthContext } from "../../context/AuthContext";
import CustomDropdown from "../../components/CustomDropDown";
import { markAttendance } from "../../context/api";
import { icons } from "../../constants";
// import { DateTime } from "luxon";

const Attend = ({ route }) => {
  const { fetchAllUsers } = useContext(AuthContext);
  const { selectedTimeLimit, courseId, date, startTime } = route.params;
  const navigation = useNavigation();
  const [students, setStudents] = useState([]);
  const [authenticatedStudents, setAuthenticatedStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [timeLeft, setTimeLeft] = useState(selectedTimeLimit * 60);

  useEffect(() => {
    fetchStudents();

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          Alert.alert("Time's up", "Attendance time has elapsed");
          submitAttendance();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedTimeLimit, authenticatedStudents, courseId, date, startTime]);

  const handleFingerprintScan = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      Alert.alert(
        "Error",
        "Fingerprint scanning is not available on this device"
      );
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Scan your fingerprint",
    });

    if (result.success) {
      const templateId = `fp-${Date.now()}`;
      setAuthenticatedStudents([...authenticatedStudents, selectedStudent]);

      console.log(courseId, date, startTime, authenticatedStudents);
      // console.log('Fingerprint Template ID:', templateId);
      Alert.alert("Success", "Fingerprint captured successfully!");
    } else {
      Alert.alert("Error", "Failed to capture fingerprint");
    }
  };

  const fetchStudents = async () => {
    try {
      const users = await fetchAllUsers();
      if (users && users.students) {
        setStudents(users.students.map((student) => student.matriculeNumber));
      } else {
        Alert.alert("Error", "Failed to fetch students");
      }
    } catch (error) {
      console.error("Error fetching students", error);
      Alert.alert("Error", "Failed to fetch students");
    }
  };

  const submitAttendance = async () => {
    try {
      const attendance = {
        courseId: courseId,
        date: date, //new Date(date),
        startTime: startTime, //new Date(`${date}T${startTime}:00Z`),
        studentIds: authenticatedStudents,
      };
      const response = await markAttendance(attendance);
      console.log(courseId, date, startTime, authenticatedStudents);
      if (response.status === 200) {
        Alert.alert("Success", "Attendance marked successfully");
        navigation.navigate("viewAttendance");
      } else {
        Alert.alert("Error", "Failed to mark attendance");
      }
    } catch (error) {
      console.error("Error marking attendance", error);
      Alert.alert("Error", "Failed to mark attendance");
      console.log(courseId, authenticatedStudents);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.timer}>Time Left: {formatTime(timeLeft)}</Text>
        <CustomDropdown
          title="Select Student"
          data={students}
          placeholder="Student"
          onSelect={setSelectedStudent}
        />
        {selectedStudent && (
          <TouchableOpacity
            onPress={handleFingerprintScan}
            style={styles.fingerprintContainer}
          >
            <Image source={icons.fingerprint} style={styles.fingerprintImage} />
            <Text style={styles.fingerprintText}>Fingerprint</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  timer: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "red",
  },
  fingerprintContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    alignItems: "center",
  },
  fingerprintImage: {
    width: 80,
    height: 80,
  },
  fingerprintText: {
    marginTop: 10,
    fontSize: 18,
  },
});

export default Attend;
