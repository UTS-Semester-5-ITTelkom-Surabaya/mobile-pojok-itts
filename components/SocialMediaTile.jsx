import React from 'react';
import { StyleSheet, Linking } from 'react-native';
import { Text, Box } from '@gluestack-ui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  line: {
    flexDirection: 'row',
  },
});

export default function SocialMediaTile({ iconName, url }) {
  const completeUrl = `https://www.${url}`;

  function handleProfileURL() {
    Linking.canOpenURL(completeUrl).then((supported) => {
      if (!supported) {
        return;
      }

      Linking.openURL(completeUrl);
    });
  }

  return (
    <Box style={styles.line}>
      <Icon name={iconName} size={24} />
      <Box width={12} />
      <Text onPress={() => handleProfileURL()}>{url}</Text>
    </Box>
  );
}

SocialMediaTile.propTypes = {
  iconName: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
