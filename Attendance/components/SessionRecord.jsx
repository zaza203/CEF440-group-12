// components/SessionRecord.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SessionRecord = ({ sessionId, status }) => {
  return (
    <View style={styles.recordContainer}>
      <Text style={styles.sessionText}>Session ID: {sessionId}</Text>
      <View style={[styles.statusContainer, status === 'Ongoing' ? styles.ongoing : styles.ended]}>
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
  sessionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  statusContainer: {
    padding: 10,
    borderRadius: 5,
  },
  ongoing: {
    backgroundColor: '#FFC107', // Yellow for ongoing sessions
  },
  ended: {
    backgroundColor: '#8BC34A', // Green for ended sessions
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SessionRecord;
