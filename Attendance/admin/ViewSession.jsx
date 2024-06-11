// screens/ViewSession.js

import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import SessionRecord from '../components/SessionRecord';

const sessionData = [
  { id: '1', sessionId: 'CS101', status: 'Ended' },
  { id: '2', sessionId: 'CS102', status: 'Ongoing' },
  { id: '3', sessionId: 'CS103', status: 'Ended' },
  { id: '4', sessionId: 'CS104', status: 'Ended' },
  { id: '5', sessionId: 'CS105', status: 'Ended' },
  { id: '6', sessionId: 'CS106', status: 'Ended' },
  { id: '7', sessionId: 'CS107', status: 'Ended' },
  { id: '8', sessionId: 'CS108', status: 'Ended' },
  { id: '9', sessionId: 'CS109', status: 'Ended' },
  { id: '10', sessionId: 'CS110', status: 'Ended' },
];

const ViewSession = () => {
  const ongoingSession = sessionData.find(session => session.status === 'Ongoing');
  const pastSessions = sessionData.filter(session => session.status === 'Ended');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Session Records</Text>
      {ongoingSession && (
        <>
          <Text style={styles.sectionTitle}>Ongoing Session</Text>
          <SessionRecord sessionId={ongoingSession.sessionId} status={ongoingSession.status} />
        </>
      )}
      <Text style={styles.sectionTitle}>Past Sessions</Text>
      <FlatList
        data={pastSessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SessionRecord
            sessionId={item.sessionId}
            status={item.status}
          />
        )}
      />
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
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: 'bold',
  },
});

export default ViewSession;
