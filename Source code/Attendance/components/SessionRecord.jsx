import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'MMMM dd, yyyy'); // Format date as "July 06, 2024"
};

const formatTime = (timeString) => {
  const [hour, minute] = timeString.split(':');
  const formattedHour = hour.padStart(2, '0');
  return `${formattedHour}:${minute}`;
};

const SessionRecord = ({ courseId, date, lecturer, startTime, endTime, status }) => {
  return (
    <View style={styles.recordContainer}>
      <View style={styles.detailsContainer}>
        <Text style={styles.courseCode}>{courseId}</Text>
        <Text style={styles.sessionText}>{lecturer}</Text>
        <Text style={styles.dateText}>{formatDate(date)}</Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.sessionText}>{formatTime(startTime)}</Text>
        <Text style={styles.sessionText}>{formatTime(endTime)}</Text>
        <Text style={[
          styles.statusText, 
          status === 'Ongoing' ? styles.ongoing : 
          status === 'Ended' ? styles.ended : 
          styles.upcoming
        ]}>
          {status}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  recordContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 5,
    borderRadius: 5,
    elevation: 2,
    justifyContent: 'space-between',
    height: 80, // Adjust the height to be more compact
  },
  detailsContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  courseCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  sessionText: {
    fontSize: 14,
    color: 'gray',
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'gray',
  },
  timeContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  statusText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  ongoing: {
    color: '#FFC107', // Yellow for ongoing sessions
  },
  ended: {
    color: '#8BC34A', // Green for ended sessions
  },
  upcoming: {
    color: '#00BFFF', // Blue for upcoming sessions
  },
});

export default SessionRecord;
