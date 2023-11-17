/* eslint-disable react/jsx-no-bind */
/* eslint-disable object-curly-newline */
import { Box } from '@gluestack-ui/themed';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, ActivityIndicator, FlatList } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';
import ArticleTile from '../components/ArticleTile';

SplashScreen.preventAutoHideAsync();

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  titleText: {
    fontFamily: 'Charter-Bold',
    fontSize: 32,
    lineHeight: 32,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function ArticlesScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);

  const getArticles = async () => {
    try {
      const response = await fetch(
        // eslint-disable-next-line comma-dangle
        'https://raw.githubusercontent.com/dauditts/pm-static-api/main/articles.json'
      );
      const json = await response.json();
      setArticles(json.articles);
    } catch (error) {
      Alert.alert(
        'Error',
        // eslint-disable-next-line comma-dangle
        'There was an error fetching articles. Please try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getArticles();
  }, []);

  function renderArticles(article) {
    function pressHandler() {
      navigation.navigate('ArticleDetail', {
        article: article.item,
      });
    }

    return (
      <Box>
        <ArticleTile article={article.item} onPress={pressHandler} />
      </Box>
    );
  }

  return (
    <Box style={styles.screenContainer}>
      {isLoading || articles.length === 0 ? (
        <Box style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </Box>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderArticles}
        />
      )}
    </Box>
  );
}
