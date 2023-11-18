import React from 'react';
import { StyleSheet, Linking } from 'react-native';
import { Text, Image, Box, ScrollView } from '@gluestack-ui/themed';
import { useRoute } from '@react-navigation/native';

import { ActionButton, SizedBox } from '../components';

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
      borderRadius: 12,
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

  function handleOpenUrl() {
    Linking.canOpenURL(article.link).then((supported) => {
      if (!supported) {
        return;
      }

      Linking.openURL(article.link);
    });
  }

  return (
    <ScrollView style={styles.screenContainer}>
      <Box style={{ paddingVertical: 24 }}>
        <Text style={styles.article.title}>{article.title}</Text>
        <SizedBox height={24} />
        <Image
          source={article.image}
          alt={article.title}
          style={styles.article.image}
          role="article"
        />
        <SizedBox height={12} />
        <Text style={styles.article.date}>{article.date}</Text>
        <SizedBox height={12} />
        <Text style={styles.article.content}>{article.content}</Text>
        <SizedBox height={24} />
        <ActionButton onPress={() => handleOpenUrl()} text="READ MORE" />
      </Box>
    </ScrollView>
  );
}
