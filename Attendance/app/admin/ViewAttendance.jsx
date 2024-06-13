import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import {React,useState}from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import { icons } from "../../constants";
import { Link, router,useNavigation } from "expo-router";
import SetDate from "../../components/SetDate";
import CustomDropdown from "../../components/CustomDropDown";
import CustomButton from "../../components/CustomButton";
import StudentRecord from "../../components/StudentRecord";

const ViewAttendance = () => {

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const Courses = ['CEF440', 'CEF476', 'CEF444', 'CEF438', 'CEF450'];
  const [selectedItem, setSelectedItem] = useState('');
  const [show, setShow] = useState(false)

  const studentData = [
    { id: '1', name: 'John Doe', courseSessionId: 'CS101', status: 'Present' },
    { id: '2', name: 'Jane Smith', courseSessionId: 'CS102', status: 'Absent' },
    { id: '3', name: 'Alice Johnson', courseSessionId: 'CS101', status: 'Present' },
    { id: '4', name: 'Bob Brown', courseSessionId: 'CS102', status: 'Absent' },
    { id: '5', name: 'Charlie Davis', courseSessionId: 'CS103', status: 'Present' },
    { id: '6', name: 'Diana Evans', courseSessionId: 'CS101', status: 'Absent' },
    { id: '7', name: 'Ethan Ford', courseSessionId: 'CS104', status: 'Present' },
    { id: '8', name: 'Fiona Green', courseSessionId: 'CS102', status: 'Absent' },
    { id: '9', name: 'George Harris', courseSessionId: 'CS103', status: 'Present' },
    { id: '10', name: 'Hannah Irving', courseSessionId: 'CS101', status: 'Absent' },
    { id: '11', name: 'Ian Jackson', courseSessionId: 'CS104', status: 'Present' },
    { id: '12', name: 'Julia King', courseSessionId: 'CS103', status: 'Absent' },
    { id: '13', name: 'Kevin Lewis', courseSessionId: 'CS102', status: 'Present' },
    { id: '14', name: 'Laura Miller', courseSessionId: 'CS101', status: 'Absent' },
    { id: '15', name: 'Michael Nelson', courseSessionId: 'CS104', status: 'Present' },
  ];

  const navigation = useNavigation()

  return (
    <SafeAreaView className="">
      <ScrollView  >
        <View className="h-full w-full ">

          <Text>Enter course Title</Text>

        <CustomDropdown
        title="Enter Course"
          data={Courses}
          placeholder="Course"
          onSelect={(item) => setSelectedItem(item)}
        />

        <SetDate date={fromDate} setDate={setFromDate} title="From" />
        <SetDate date={toDate} setDate={setToDate} title="To" />
  
        <CustomButton title="View Records"  
         handlepress={() => {
         setShow(true)
          
        }}
        />


     {show? 
      <>
        <Text style={styles.title}>Attendance Records</Text>
      <FlatList
        data={studentData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StudentRecord
            name={item.name}
            courseSessionId={item.courseSessionId}
            status={item.status}
          />
        )}
      />
      <CustomButton title="Generate Report" />
      </> : null
}
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
  }})

export default ViewAttendance;
