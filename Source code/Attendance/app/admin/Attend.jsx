import React, { useState, useEffect, useContext } from "react";
import { View, Text, Alert, StyleSheet, Vibration } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import { AuthContext } from '../../context/AuthContext';
import CustomDropdown from "../../components/CustomDropDown";
import { markAttendance } from "../../context/api";
import Icon from 'react-native-vector-icons/FontAwesome';

const Attend = ({ route }) => {
  const { fetchAllUsers } = useContext(AuthContext);
  const { selectedTimeLimit, courseId } = route.params;
  const navigation = useNavigation();
  const [students, setStudents] = useState([]);
  const [authenticatedStudents, setAuthenticatedStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [timeLeft, setTimeLeft] = useState(selectedTimeLimit * 60);
  const [fingerprintStatus, setFingerprintStatus] = useState(null);
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
  }, []);

  const fetchStudents = async () => {
    try {
      const users = await fetchAllUsers();
      if (users && users.students) {
        setStudents(users.students.map(student => student.matriculeNumber));
      } else {
        Alert.alert('Error', 'Failed to fetch students');
      }
    } catch (error) {
      console.error('Error fetching students', error);
      Alert.alert('Error', 'Failed to fetch students');
    }
  };

  useEffect(() => {
    if (selectedStudent) {
      handleAuthenticate();
    }
  }, [selectedStudent]);

  const handleAuthenticate = async () => {
    try {
      const success = await authenticateFingerprint();
      if (success) {
        setAuthenticatedStudents([...authenticatedStudents, selectedStudent]);
        setFingerprintStatus('success');
        Vibration.vibrate(100);
        setTimeout(() => setFingerprintStatus(null), 2000);
        setSelectedStudent("");
      } else {
        setFingerprintStatus('fail');
        Vibration.vibrate([100, 200, 100]);
        setTimeout(() => setFingerprintStatus(null), 2000);
      }
    } catch (error) {
      console.error('Error authenticating fingerprint', error);
      Alert.alert('Error', 'Failed to authenticate fingerprint');
    }
  };

  const authenticateFingerprint = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(Math.random() > 0.5), 1000);
    });
  };

  const submitAttendance = async () => {
    try {
      const response = await markAttendance({
        session: courseId,
        students: authenticatedStudents.map(student => ({ studentId: student, status: "P" }))
      });
      console.log(courseId, students)
      if (response.status === 200) {
        Alert.alert("Success", "Attendance marked successfully");
        navigation.navigate("ViewAttendance");
      } else {
        Alert.alert("Error", "Failed to mark attendance");
      }
    } catch (error) {
      console.error('Error marking attendance', error);
      Alert.alert('Error', 'Failed to mark attendance');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const renderFingerprintStatus = () => {
    if (fingerprintStatus === 'success') {
      return <Icon name="check-circle" size={80} color="green" />;
    }
    if (fingerprintStatus === 'fail') {
      return <Icon name="times-circle" size={80} color="red" />;
    }
    return <Icon name="fingerprint" size={80} color="gray" />;
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
          <View style={styles.fingerprintContainer}>
            {renderFingerprintStatus()}
            <Text style={styles.fingerprintText}>
              {fingerprintStatus === 'success'
                ? "Authenticated"
                : fingerprintStatus === 'fail'
                ? "Try Again"
                : "Place Finger on Scanner"}
            </Text>
          </View>
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
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'red',
  },
  fingerprintContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
  },
  fingerprintText: {
    marginTop: 10,
    fontSize: 18,
  },
});

export default Attend;
