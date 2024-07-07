import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure to import the icon library

const ConfirmFingerPrint = () => {
  const [scaleValue] = useState(new Animated.Value(1));

  const handleFingerprintPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.8,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleFingerprintPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fingerprint Authentication</Text>
      <Text style={styles.description}>Use your fingerprint to authenticate</Text>
      <TouchableOpacity
        onPressIn={handleFingerprintPressIn}
        onPressOut={handleFingerprintPressOut}
        style={styles.fingerprintButton}
      >
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <Icon name="fingerprint" size={64} color="#4a90e2" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  fingerprintButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
    padding: 20,
  },
});

export default ConfirmFingerPrint;
