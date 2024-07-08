// import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
// import React, { useState } from 'react';
// import { router, useNavigation } from 'expo-router';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import CustomDropdown from '../../components/CustomDropDown';
// import CustomButton from '../../components/CustomButton';
// import SetTime from '../../components/SetTime';
// import { addSession } from '../../context/api';

// const AddSession = () => {
//   const navigation = useNavigation();
//   const [selectedCourse, setSelectedCourse] = useState('');
//   const [selectedLecturer, setSelectedLecturer] = useState('');
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const [date, setDate] = useState(new Date());
//   const Lecturers = ['Dr. Nkemani', 'Dr. Nguti', 'Dr. Djouela', 'Dr. Tsague', 'Dr. Sop', 'Dr. Fenji', 'Dr. Fonzi'];
//   const Courses = ['CEF440', 'CEF476', 'CEF444', 'CEF438', 'CEF450'];

//   const handleAddSession = async () => {
//     try {
//       const session = {
//         lecturer: selectedLecturer,
//         courseId: selectedCourse,
//         date: date.toISOString().split('T')[0],
//         startTime: startTime,
//         endTime: endTime
//       };
//       await addSession(session);
//       Alert.alert('Success', 'Session added successfully');
//       router.back("Dashboard");
//     } catch (error) {
//       Alert.alert('Error', 'Failed to add session');
//       console.error(error);
//     }
//   };

//   return (
//     <SafeAreaView className="bg-white h-full">
//       <View className="mx-2">
//         <CustomDropdown
//           data={Courses}
//           placeholder="Course"
//           onSelect={(item) => setSelectedCourse(item)}
//         />
//         <CustomDropdown
//           data={Lecturers}
//           placeholder="Lecturer"
//           onSelect={(item) => setSelectedLecturer(item)}
//         />
//         <SetTime title="Start Time" onTimeChange={setStartTime} />
//         <SetTime title="End Time" onTimeChange={setEndTime} />
//         <CustomButton 
//           title="Add"
//           handlepress={handleAddSession}
//         />
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   dropdownContainer: {
//     width: '100%',
//     paddingHorizontal: 20,
//   }
// });

// export default AddSession;


import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import SetDate from '../../components/SetDate';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { addSession, getAllCourses } from '../../context/api';
import { AuthContext } from '../../context/AuthContext';
import CustomDropdown from '../../components/CustomDropDown';

const AddSession = () => {
  const { state } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState('');
  const [lecturer, setLecturer] = useState('');
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getAllCourses();
      if (response.status === 200) {
        setCourses(response.data);
      } else {
        Alert.alert('Error', 'Failed to fetch courses');
      }
    } catch (error) {
      console.error('Error fetching courses', error);
      Alert.alert('Error', 'Failed to fetch courses');
    }
  };

  const handleCourseSelect = (selectedCourseId) => {
    const selectedCourse = courses.find(course => course.courseId === selectedCourseId);
    if (selectedCourse) {
      setCourse(selectedCourse.courseId);
      setLecturer(selectedCourse.lecturer);
    }
  };

  const handleAddSession = async () => {
    if (!course || !lecturer || !date || !startTime || !endTime) {
      Alert.alert('Error', 'All fields must be filled');
      return;
    }

    const formattedDate = date.toISOString().split('T')[0];
    const formattedStartTime = startTime.toTimeString().split(' ')[0];
    const formattedEndTime = endTime.toTimeString().split(' ')[0];

    // const session = {
    //   courseId: course,
    //   instructor: lecturer,
    //   date: formattedDate,
    //   startTime: formattedStartTime,
    //   endTime: formattedEndTime,
    //   createdBy: state.user.uid,
    //   createdAt: new Date(),
    // };

    const session = {
      courseId: course,
      lecturer: lecturer,
      date: formattedDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
    };

    try {
      await addSession(session);
      Alert.alert('Success', 'Session added successfully!');
      setCourse('');
      setLecturer('');
      setDate(null);
      setStartTime(null);
      setEndTime(null);
    } catch (error) {
      console.error('Error adding session: ', error);
      Alert.alert('Error', 'Failed to add session. Please try again.');
    }
  };

  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };

  const handleConfirmStartTime = (selectedTime) => {
    setStartTime(selectedTime);
    hideStartTimePicker();
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };

  const handleConfirmEndTime = (selectedTime) => {
    setEndTime(selectedTime);
    hideEndTimePicker();
  };

  return (
    <SafeAreaView style={styles.container} className="px-7">
      <View style={styles.form}>
        <Text style={styles.title}>Add Session</Text>
        <CustomDropdown
          data={courses.map((item) => item.courseId)}
          placeholder="Select Course"
          onSelect={handleCourseSelect}
          value={course}
          otherStyles="mt-2"
        />
        {lecturer && (
          <View style={styles.input} className="justify-center align-center">
            <Text style={styles.lecturer} className="font-bold">{lecturer}</Text>
          </View>
        )}
        
        <SetDate date={date} setDate={setDate} title="Select Date" />
          <View style={styles.timePickerContainer}>
            <Text style={styles.label}>Select Start Time</Text>
            <TouchableOpacity onPress={showStartTimePicker} style={styles.timeButton} className="bg-gray-200 py-3">
              <Text style={styles.timeText}>
                {startTime ? startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select Start Time'}
              </Text>
            </TouchableOpacity>
          </View>
        <DateTimePickerModal
          isVisible={isStartTimePickerVisible}
          mode="time"
          onConfirm={handleConfirmStartTime}
          onCancel={hideStartTimePicker}
        />
        <View style={styles.timePickerContainer}>
          <Text style={styles.label}>Select End Time</Text>
          <TouchableOpacity onPress={showEndTimePicker} style={styles.timeButton} className="bg-gray-200 py-3">
            <Text style={styles.timeText}>
              {endTime ? endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select End Time'}
            </Text>
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isEndTimePickerVisible}
          mode="time"
          onConfirm={handleConfirmEndTime}
          onCancel={hideEndTimePicker}
        />
        <TouchableOpacity onPress={handleAddSession} style={styles.submitButton} className="bg-primary">
          <Text style={styles.submitButtonText}>Add Session</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    marginTop: 0,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    marginTop: 10,
    marginHorizontal: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: '#333',
  },
  lecturer: {
    fontSize: 16,
    color: '#333',
  },
  timePickerContainer: {
    marginBottom: 20,
  },
  timeButton: {
    borderRadius: 5,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
  },
  submitButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddSession;

