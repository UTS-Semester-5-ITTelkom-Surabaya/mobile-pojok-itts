/* eslint-disable object-curly-newline */
import { Text, Box, Image, Pressable } from '@gluestack-ui/themed';
import { ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  articleTile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 24,
  },
  articleTileDesc: {
    flex: 10,
    height: 96,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginRight: 24,
  },
  articleTileImage: {
    flex: 5,
  },
  articleTitle: {
    fontFamily: 'Charter-Bold',
    fontSize: 18,
    lineHeight: 20,
  },
  articleDate: {
    fontFamily: 'Charter-Regular',
    fontSize: 14,
    lineHeight: 16,
  },
  articleImage: {
    height: 96,
    width: 'auto',
  },
});

function getActivityIndicator() {
  return <ActivityIndicator size="small" color="#0000ff" />;
}

function ArticleTile({ article, onPress }) {
  return (
    <Pressable
      style={styles.articleTile}
      onPress={onPress}
      android_ripple={{ color: '#d1cfcf' }}
      unstable_pressDelay={1000}
    >
      <Box style={styles.articleTileDesc}>
        <Text
          style={styles.articleTitle}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {article.title}
        </Text>
        <Text style={styles.articleDate}>{article.date}</Text>
      </Box>
      <Box style={styles.articleTileImage}>
        <Image
          style={styles.articleImage}
          source={article.image}
          loadingBuilder={getActivityIndicator}
          alt={article.title}
          rounded={12}
          role="article"
        />
      </Box>
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
