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
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SessionRecord
            courseId={item.courseId}
            lecturer={item.lecturer}
            date={item.date}
            startTime={item.startTime}
            endTime={item.endTime}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ViewSession;
