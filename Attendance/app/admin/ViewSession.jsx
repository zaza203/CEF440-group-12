import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import SessionRecord from '../../components/SessionRecord';
import { getAllSessions } from '../../context/api';

const ViewSession = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await getAllSessions();
        const sessionsWithStatus = response.data.map((session) => {
          const { date, startTime, endTime } = session;
          const sessionDate = new Date(date);
          const sessionStartTime = new Date(`${date}T${startTime}`);
          const sessionEndTime = new Date(`${date}T${endTime}`);
          const currentDateTime = new Date();

          let status = 'Upcoming';
          if (currentDateTime > sessionEndTime) {
            status = 'Ended';
          } else if (currentDateTime >= sessionStartTime && currentDateTime <= sessionEndTime) {
            status = 'Ongoing';
          }

          return { ...session, status };
        });

        setSessions(sessionsWithStatus);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const ongoingSession = sessions.find(session => session.status === 'Ongoing');
  const pastSessions = sessions.filter(session => session.status === 'Ended');
  const upcomingSessions = sessions.filter(session => session.status === 'Upcoming');

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Session Records</Text>
      {ongoingSession && (
        <>
          <Text style={styles.sectionTitle}>Ongoing Session</Text>
          <SessionRecord sessionId={ongoingSession.sessionId} status={ongoingSession.status} />
        </>
      )}
      <Text style={styles.sectionTitle}>Upcoming Sessions</Text>
      <FlatList
        data={upcomingSessions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SessionRecord
            sessionId={item.sessionId}
            status={item.status}
          />
        )}
      />
      <Text style={styles.sectionTitle}>Past Sessions</Text>
      <FlatList
        data={pastSessions}
        keyExtractor={(item) => item.id.toString()}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ViewSession;
