// components/StudentHistoryRecord.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StudentHistoryRecord = ({ date, courseSessionId, status, note }) => {
  return (
    <View style={styles.recordContainer}>
      <Text style={styles.dateText}>{date}</Text>
      <Text style={styles.sessionText}>Session ID: {courseSessionId}</Text>
      <Text style={[styles.statusText, status === 'Present' ? styles.present : styles.absent]}>{status}</Text>
      {note && <Text style={styles.noteText}>{note}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  recordContainer: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 5,
    borderRadius: 5,
    elevation: 2,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  sessionText: {
    fontSize: 14,
    color: '#666',
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  present: {
    color: 'green',
  },
  absent: {
    color: 'red',
  },
  noteText: {
    fontSize: 12,
    color: '#999',
  },
});

export default StudentHistoryRecord;
