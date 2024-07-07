import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import StudentHistoryRecord from '../../components/StudentRecordHistory';

const students = [
  {
    id: '1',
    name: 'John Doe',
    attendance: [
      { id: '1', date: '2024-06-01', courseSessionId: 'CS101', status: 'Present', note: 'On time' },
      { id: '2', date: '2024-06-02', courseSessionId: 'CS102', status: 'Absent', note: 'Sick' },
      { id: '3', date: '2024-06-03', courseSessionId: 'CS103', status: 'Present', note: 'Late by 10 mins' },
    ],
  },
  {
    id: '2',
    name: 'Jane Smith',
    attendance: [
      { id: '1', date: '2024-06-01', courseSessionId: 'CS101', status: 'Absent', note: 'Sick' },
      { id: '2', date: '2024-06-02', courseSessionId: 'CS102', status: 'Present', note: 'On time' },
      { id: '3', date: '2024-06-03', courseSessionId: 'CS103', status: 'Absent', note: '' },
    ],
  },
];

const StudentHistory = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleStudentChange = (value) => {
    const student = students.find((student) => student.id === value);
    setSelectedStudent(student);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Student to View Record</Text>
      <RNPickerSelect
        onValueChange={handleStudentChange}
        items={students.map((student) => ({
          label: student.name,
          value: student.id,
        }))}
        placeholder={{ label: 'Select a student...', value: null }}
        style={pickerSelectStyles}
      />
      {selectedStudent && (
        <>
          <View style={styles.header}>
            <Text style={styles.name}>{selectedStudent.name}</Text>
            <Text style={styles.studentId}>ID: {selectedStudent.id}</Text>
          </View>
          <View style={styles.summary}>
            <Text style={styles.summaryText}>
              Total Sessions: {selectedStudent.attendance.length}
            </Text>
            <Text style={styles.summaryText}>
              Attended: {selectedStudent.attendance.filter((record) => record.status === 'Present').length}
            </Text>
            <Text style={styles.summaryText}>
              Attendance: {((selectedStudent.attendance.filter((record) => record.status === 'Present').length / selectedStudent.attendance.length) * 100).toFixed(2)}%
            </Text>
          </View>
          <FlatList
            data={selectedStudent.attendance}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <StudentHistoryRecord
                date={item.date}
                courseSessionId={item.courseSessionId}
                status={item.status}
                note={item.note}
              />
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  studentId: {
    fontSize: 16,
    color: '#666',
  },
  summary: {
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 20,
    backgroundColor: 'white',
  },
});

export default StudentHistory;
