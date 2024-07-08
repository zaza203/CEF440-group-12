import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomDropdown from "../../components/CustomDropDown";
import CustomButton from "../../components/CustomButton";
import StudentRecord from "../../components/StudentRecord";
import { getAllAttendances } from "../../context/api";
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';



const ViewAttendance = () => {
  const [selectedSession, setSelectedSession] = useState("");
  const [sessions, setSessions] = useState([]);
  const [show, setShow] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [allAttendances, setAllAttendances] = useState([]);
  const [pdfUri, setPdfUri] = useState(null);

  useEffect(() => {
    fetchAttendances();
  }, []);

  const fetchAttendances = async () => {
    try {
      const response = await getAllAttendances();
      if (response.status === 200) {
        setAllAttendances(response.data);
        const sessionData = response.data.map(
          (attendance) =>
            `${attendance.courseId} ${attendance.date} ${attendance.startTime}`
        );
        setSessions(sessionData);
      } else {
        Alert.alert("Error", "Failed to fetch attendance records");
      }
    } catch (error) {
      console.error("Error fetching attendance records", error);
      Alert.alert("Error", "Failed to fetch attendance records");
    }
  };

  const handleViewRecords = () => {
    try {
      // Extract the courseId, date, and time from the selected session
      const [courseId, date, startTime] = selectedSession.split(" ");

      console.log(
        `courseId: ${courseId}, date: ${date}, startTime: ${startTime}`
      );

      const attendance = allAttendances.find(
        (att) =>
          att.courseId === courseId &&
          att.date === date &&
          att.startTime === startTime
      );

      if (attendance) {
        setStudentData(attendance.studentIds.map((id) => ({ id })));
        setShow(true);
      } else {
        Alert.alert("Error", "No matching attendance records found");
      }
    } catch (error) {
      console.error("Error fetching attendance records", error);
      Alert.alert("Error", "Failed to fetch attendance records");
    }
  };

  const status = "Present";

  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return dateObj.toLocaleDateString("en-US", options);
  };

  const formatTime = (timeStr) => {
    const dateObj = new Date(`1970-01-01T${timeStr}`);
    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    return dateObj.toLocaleTimeString('en-US', options);
  };
  
  const generatePDF = async () => {
    const htmlContent = `
      <html>
        <body>
          <h1>Attendance Records</h1>
          <ul>
            ${studentData.map((student) => `<li>${student.id}</li>`).join("")}
          </ul>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      console.log(`PDF generated at: ${uri}`);
      Alert.alert('Success', 'PDF generated successfully!');
    } catch (error) {
      console.error('Error generating PDF', error);
      Alert.alert('Error', 'Failed to generate PDF');
    }
  };


  const openPDF = async () => {
    try {
      if (pdfUri) {
        await FileSystem.getContentUriAsync(pdfUri).then(cUri => {
          FileSystem.openAsync(cUri.uri);
        });
      } else {
        Alert.alert('Error', 'No PDF available to open.');
      }
    } catch (error) {
      console.error('Error opening PDF', error);
      Alert.alert('Error', 'Failed to open PDF');
    }
  };

  
  return (
    <SafeAreaView className="flex-1">
      <FlatList
        ListHeaderComponent={() => (
          <View className="p-4">
            <Text>Select Session to View Attendance</Text>
            <CustomDropdown
              title="Select Session"
              data={sessions}
              placeholder="Select Session"
              onSelect={setSelectedSession}
            />
            <CustomButton
              title="View Records"
              handlepress={handleViewRecords}
            />
          <View>
            <Text>{selectedSession && `${formatDate(selectedSession.split(' ')[1])}, ${formatTime(selectedSession.split(' ')[2])}`}</Text>

            </View>
          </View>
        )}
        data={show ? studentData : []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <>
            <StudentRecord name={item.id} status={status} />
          </>
        )}
        ListEmptyComponent={() => (
          <View className="p-4">
            <Text>No records to display.</Text>
          </View>
        )}
        ListFooterComponent={() =>
          show && (
            <View className="p-4">
                          {pdfUri ? (
              <TouchableOpacity onPress={openPDF}>
                <CustomButton title="Open Report" />
              </TouchableOpacity>
            ) : (
              <CustomButton title="Generate Report" handlepress={generatePDF} />
            )}

            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default ViewAttendance;
