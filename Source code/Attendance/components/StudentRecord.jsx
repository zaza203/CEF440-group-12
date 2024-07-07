
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StudentRecord = ({ name, courseSessionId, status }) => {
  return (
    <View style={styles.recordContainer}>
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.sessionText}>Session ID: {courseSessionId}</Text>
      <View style={[styles.statusContainer, status === 'Present' ? styles.present : styles.absent]}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  recordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 5,
    borderRadius: 5,
    elevation: 2,
  },
  nameText: {
    flex: 2,
    fontSize: 16,
    color: '#333',
  },
  sessionText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  statusContainer: {
    padding: 10,
    borderRadius: 5,
  },
  present: {
    backgroundColor: '#4CAF50',
  },
  absent: {
    backgroundColor: '#F44336',
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default StudentRecord;
