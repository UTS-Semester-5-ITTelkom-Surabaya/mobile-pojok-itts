/* eslint-disable object-curly-newline */
import { Text, Box, Image, Pressable } from '@gluestack-ui/themed';
import { ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

import SizedBox from './SizedBox';

const styles = StyleSheet.create({
  article: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 24,
    desc: {
      flex: 10,
      height: 96,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      title: {
        fontFamily: 'Charter-Bold',
        fontSize: 18,
        lineHeight: 20,
      },
      date: {
        fontFamily: 'Charter-Regular',
        fontSize: 14,
        lineHeight: 16,
      },
    },
    image: {
      flex: 5,
      height: 96,
      width: 'auto',
      borderRadius: 8,
    },
  },
});

function getActivityIndicator() {
  return <ActivityIndicator size="small" color="#0000ff" />;
}

function ArticleTile({ article, onPress }) {
  return (
    <Pressable
      style={styles.article}
      onPress={onPress}
      android_ripple={{ color: '#d1cfcf' }}
      unstable_pressDelay={1000}
    >
      <Box style={styles.article.desc}>
        <Text
          style={styles.article.desc.title}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {article.title}
        </Text>
        <Text style={styles.article.desc.date}>{article.date}</Text>
      </Box>
      <SizedBox width={24} />
      <Image
        style={styles.article.image}
        source={article.image}
        loadingBuilder={getActivityIndicator}
        alt={article.title}
        role="article"
      />
    </Pressable>
  );
}

ArticleTile.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        uri: PropTypes.string.isRequired,
      }),
    ]).isRequired,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};

export default ArticleTile;
