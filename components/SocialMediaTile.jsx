import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Box } from '@gluestack-ui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  line: {
    flexDirection: 'row',
  },
});

export default function SocialMediaTile({ iconName, url }) {
  return (
    <Box style={styles.line}>
      <Icon name={iconName} size={24} />
      <Box width={12} />
      <Text>{url}</Text>
    </Box>
  );
}

SocialMediaTile.propTypes = {
  iconName: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
