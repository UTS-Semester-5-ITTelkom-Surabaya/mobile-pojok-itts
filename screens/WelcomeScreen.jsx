/* eslint-disable object-curly-newline */
import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Image, Box, Text } from '@gluestack-ui/themed';
import * as SplashScreen from 'expo-splash-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SocialMediaTile from '../components/SocialMediaTile';
import ActionButton from '../components/ActionButton';
import SizedBox from '../components/SizedBox';

const CharterRegular = require('../assets/fonts/Charter-Regular.otf');
const CharterBold = require('../assets/fonts/Charter-Bold.otf');

SplashScreen.preventAutoHideAsync();

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  profileHeader: {
    flexDirection: 'row',
    image: {
      width: 80,
      height: 80,
      borderRadius: 40,
      resizeMode: 'cover',
      marginRight: 16,
    },
    content: {
      justifyContent: 'center',
      alignItems: 'stretch',
      flex: 1,
      title: {
        fontFamily: 'Charter-Bold',
        fontSize: 24,
        lineHeight: 24,
      },
      subtitle: {
        fontSize: 14,
        lineHeight: 14,
      },
    },
  },
  profileBody: {
    flexDirection: 'column',
    height: '10%',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  logo: {
    position: 'absolute',
    width: '40%',
    top: 48,
    alignSelf: 'center',
    objectFit: 'contain',
  },
});

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const insets = useSafeAreaInsets();

  const [fontsLoaded] = useFonts({
    'Charter-Regular': CharterRegular,
    'Charter-Bold': CharterBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView
      style={{
        ...styles.screenContainer,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      onLayout={onLayoutRootView}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <Box style={styles.profileHeader}>
        <Image
          source={{
            uri: 'https://avatars.githubusercontent.com/u/96810584?v=4',
          }}
          style={styles.profileHeader.image}
          alt="Ahmad Faisal's profile picture"
          role="article"
        />
        <Box style={styles.profileHeader.content}>
          <Text style={styles.profileHeader.content.title}>Ahmad Faisal</Text>
          <SizedBox height={8} />
          <Text style={styles.profileHeader.content.subtitle}>
            1203210101 &bull; Informatika &bull; 2021
          </Text>
        </Box>
      </Box>
      <Box style={{ height: 24 }} />
      <Box style={styles.profileBody}>
        <SocialMediaTile iconName="github-square" url="github.com/fzl-22" />
        <SocialMediaTile
          iconName="linkedin-square"
          url="linkedin.com/in/ahmadmfaisal"
        />
        <SocialMediaTile iconName="instagram" url="instagram.com/fzl_22" />
      </Box>
      <Box style={{ height: 24 }} />
      <ActionButton
        onPress={() => navigation.navigate('Articles')}
        text="LET'S GO"
      >
        LET&apos;S GO
      </ActionButton>
      <Image
        source={{
          uri: 'https://if.ittelkom-sby.ac.id/wp-content/uploads/2021/05/LOGO_1_IF-removebg-preview.png',
        }}
        style={styles.logo}
        alt="Informatics Logo"
      />
    </SafeAreaView>
  );
}
