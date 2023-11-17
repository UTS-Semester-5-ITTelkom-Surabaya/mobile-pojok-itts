import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Pressable, Text } from '@gluestack-ui/themed';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  actionButtonView: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionButton: {
    borderRadius: 16,
    alignItems: 'center',
    text: {
      fontWeight: '500',
      fontSize: 20,
      color: 'white',
    },
  },
});

export default function ActionButton({ onPress, text }) {
  return (
    <Box style={styles.actionButtonView}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: '#d9c37e' }}
        style={styles.actionButton}
        p="$5"
        backgroundColor="#d4af37"
      >
        <Text style={styles.actionButton.text}>{text}</Text>
      </Pressable>
    </Box>
  );
}

ActionButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
