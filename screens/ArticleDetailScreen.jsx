/* eslint-disable object-curly-newline */
import React from 'react';
import { StyleSheet, Linking } from 'react-native';
import { Text, Image, Box, ScrollView } from '@gluestack-ui/themed';
import { useRoute } from '@react-navigation/native';

import ActionButton from '../components/ActionButton';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  article: {
    image: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
    },
    title: {
      fontFamily: 'Charter-Bold',
      fontSize: 24,
      textAlign: 'justify',
    },
    date: {
      fontFamily: 'Charter-Bold',
      textAlign: 'right',
    },
    content: {
      fontFamily: 'Charter-Regular',
      fontSize: 16,
      textAlign: 'justify',
    },
  },
});

export default function ArticleDetailScreen() {
  const route = useRoute();

  const { article } = route.params;

  return (
    <ScrollView style={styles.screenContainer}>
      <Box style={{ paddingVertical: 24 }}>
        <Text style={styles.article.title}>{article.title}</Text>
        <Box style={{ height: 24 }} />
        <Image
          source={article.image}
          alt={article.title}
          style={styles.article.image}
          role="article"
          resizeMode="cover"
          borderRadius={24}
        />
        <Box style={{ height: 12 }} />
        <Text style={styles.article.date}>{article.date}</Text>
        <Box style={{ height: 12 }} />
        <Text style={styles.article.content}>{article.content}</Text>
        <Box style={{ height: 24 }} />
        <ActionButton
          onPress={() => {
            Linking.canOpenURL(article.link).then((supported) => {
              if (!supported) {
                return;
              }

              Linking.openURL(article.link);
            });
          }}
          text="READ MORE"
        />
      </Box>
    </ScrollView>
  );
}
