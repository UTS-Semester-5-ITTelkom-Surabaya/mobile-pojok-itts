# Pojok ITTS

| Nama        | Ahmad Mu'min Faisal                                                   |
| ----------- | --------------------------------------------------------------------- |
| NIM         | 1203210101                                                            |
| Kelas       | IF-01-03                                                              |
| URL Github  | https://github.com/UTS-Semester-5-ITTelkom-Surabaya/mobile-pojok-itts |
| URL Youtube | https://youtu.be/3xxllwLu2LY                                          |

## 1 Inisiasi Project
### 1.1 Membuat Project Expo

Untuk membuat project Expo, jalankan perintah berikut:

```bash
npx create-expo-app mobile-pojok-itts
```

### 1.2 Konfigurasi ESLint

Agar kode lebih rapi, fitur ESLint dapat dimanfaatkan. Pertama, install ESLint:

```bash
npm install -g eslint
```

Setelah terinstall, implementasikan ESLint ke project ini dengan cara menjalankan perintah berikut:

```bash
eslint --init
```

Kemudian, programmer akan diberikan beberapa pilihan. Pilih `AirBnB` dan `Javascript`. Setelah konfigurasi selesai, maka akan muncul banyak error pada source code yang perlu dibenahi.

Selama mengembangkan aplikasi Pojok ITTS, ESLint akan memberikan aturan yang ketat untuk dipatuhi agar kode program menjadi jauh lebih rapi.

## 2 Soal

### 2.1 Mahasiswa mampu menerapkan konsep ReactJS sebagai dasar pemrograman React Native

#### 2.1.1 Buat Aplikasi Mobile sederhana menggunakan React Native yang menampilkan Daftar Berita ITTelkom Surabaya yang diambil dari endpoint API soal nomor 4

Untuk menampilkan, siapkan endpoint dari API yang ingin diambil datanya, yaitu: https://raw.githubusercontent.com/dauditts/pm-static-api/main/articles.json.

Proses ini dilakukan di halaman `ArticlesScreen.jsx`. Kemudian, siapkan state untuk menyimpan data dan melakukan loading.

```jsx
/* other code */
const [isLoading, setIsLoading] = useState(false);
const [articles, setArticles] = useState([]);
/* other code */
```

Setelah itu, buat fungsi asynchronous untuk mengambil data dari API. Jika proses asynchronous ini selesai, maka akan menghilangkan loading dari `ActivityIndicator`.

```jsx
const getArticles = async () => {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/dauditts/pm-static-api/main/articles.json',
    );
    const json = await response.json();
    setArticles(json.articles);
  } catch (error) {
    Alert.alert(
      'Error',
      'There was an error fetching articles. Please try again later.',
    );
  } finally {
    setIsLoading(false);
  }
};
```

Kemudian, gunakan `useEffect` untuk menjalankan side effect pada component.

```jsx
useEffect(() => {
  setIsLoading(true);
  getArticles();
}, []);
```

Setelah itu, data article akan mengubah state `articles` dan merender ulang component dari `ActivityIndicator` ke data dari `FlatList`. Hal ini dilakukan agar `FlatList` tidak menangkap data yang masih berupa `Promise`.

Untuk merender daftar artikel, dapat menggunakan `FlatList` dari `GluestackUI` dengan custom component `ArticleTile`. 

```jsx
/* other code */
<FlatList
  data={articles}
  keyExtractor={(item, index) => index.toString()}
  renderItem={(item) => renderArticles(item)}
/>
/* other code */
```

Rendering setiap article dapat dijalankan menggunakan fungsi berikut (ditambahkan juga handler untuk navigasi ke halaman `ArticleDetailScreen`):

```jsx
function renderArticles(article) {
  function pressHandler() {
    navigation.navigate('ArticleDetail', {
      article: article.item,
    });
  }

  return (
    <Box>
      <ArticleTile article={article.item} onPress={() => pressHandler()} />
    </Box>
  );
}
```

Kode lengkap dari setiap komponen yang terlibat dapat dilihat di Lampiran 1:

* `screens/ArticleScreens.jsx`
* `components/ArticleTile.jsx`

#### 2.1.2 Buat semua kode program dalam bentuk Class Component

Tidak diimplementasikan

#### 2.1.3 Terapkan bentuk destructuring untuk import komponen

Untuk melakukan import destructuring, sebagai contoh pada direktori `components`. Berikut adalah file strukturnya:

```
components/
├── ActionButton.jsx
├── ArticleTile.jsx
├── BackButton.jsx
├── SizedBox.jsx
└── SocialMediaTile.jsx
```

Buat file bernama `index.js` di direktori tersebut, lakukan import semua komponen dan export semua komponen tersebut agar dapat diakses file lain.

```js
import ActionButton from './ActionButton';
import BackButton from './BackButton';
import ArticleTile from './ArticleTile';
import SocialMediaTile from './SocialMediaTile';
import SizedBox from './SizedBox';

export { ActionButton, BackButton, ArticleTile, SocialMediaTile, SizedBox };
```

Setelah itu, import di file lain bisa dilakukan dengan mudah. Misalnya di halaman `screens/WelcomeScreens.jsx`:

```jsx
/* other import */
import { SocialMediaTile, ActionButton, SizedBox } from '../components';
/* other code */
```

Lakukan hal yang sama untuk semua halaman di direktori `screens/`.

Kode lengkap dari setiap komponen yang terlibat dapat dilihat di Lampiran 1:

* `components/index.js`
* `screens/index.js`

### 2.2 Mahasiswa mampu menerapkan konsep dasar desain pada React Native

#### 2.2.1 Gunakan StyleSheet.create() serta komponen NativeBase atau library lain untuk mendukung styling / desain

Dalam project ini, aplikasi menggunakan GluestackUI ([gluestack.io](https://gluestack.io/)). Pertama, install GluestackUI di project dengan menjalankan 2 perintah berikut:

```bash
npm install @gluestack-ui/themed @gluestack-style/react react-native-svg@13.4.0
npm install @gluestack-ui/config@latest
```

Kemudian, import GluestackUI di `App.jsx` dan jadikan component `GluestackUIProvider` sebagai root component yang membungkus semua component:

```jsx
/* other import */
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
/* other code */

export default function App () {
  /* other code */

  return (
    <GluestackUIProvider config={config}>
      {/* other components */}
    </GluestackUIProvider>
  );
}
```

Untuk menggunakan component yang disediakan oleh GluestackUI, import dengan cara berikut:

```jsx
import { Text, Image, Box, ScrollView } from '@gluestack-ui/themed';
```

Kode lengkap dari setiap komponen yang terlibat dapat dilihat di Lampiran 1:

* `App.jsx`

### 2.3 Mahasiswa mampu menerapkan konsep dasar Interaction dan Navigation pada React Native

#### 2.3.1 Screen Home

Screenshot dapat diakses di [Halaman Welcome](#halaman-welcome).

Source code terdapat di Lampiran 1 `screens/WelcomeScreen.jsx`.

Pada kode program, telah ditampilkan logo prodi Informatika, profil mahasiswa, beserta tombol yang ketika diklik akan menuju ke halaman `ArticlesScreen`. Halaman ini juga menampilkan custom component yaitu `SocialMediaTile` dan `ActionButton`. Navigasi dilakukan dengan menggunakan state navigation yang berasal dari hook `useNavigation`.

#### 2.3.2 List Berita

Screenshot dapat diakses di [Halaman Articles](#halaman-articles).

Source code terdapat di Lampiran 1 `screens/ArticlesScreen.jsx`.

Pada kode program, beberapa hal terah terpenuhi:

 - halaman `ArticlesScreen` telah menampilkan list  berita menggunakan `FlatList`.
 - Komponen `ArticleTile` telah menampilkan `title`, `date`, dan `image` dari setiap object `article`.
 - Setiap `article` dapat di-klik dan dinavigasikan ke halaman `ArticleDetailScreen` melalui fungsi `renderArticles` 
 - Desain layout telah dibuat menggunakan referensi aplikasi IOS dan kode warna Informatika ITTS, yaitu `#d9c37e`.

#### 2.3.3 Detail Berita

Screenshot dapat diakses di [Halaman ArticleDetail](#halaman-articledetail).

Source code terdapat di Lampiran 1 `screens/ArticleDetailScreen.jsx`.

Pada kode program, beberapa hal terah terpenuhi:

 - halaman `ArticleDetailScreen` telah menampilkan title, `image`, `date`, dan `content` menggunakan `route.params` dari hook `useRoute`.
 - Terdapat tombol berisi "READ MORE" dari komponen `ActionButton` yang dapat mengarah ke web terkait melalui fungsi `handleOpenURL`
 - Desain layout telah dibuat menggunakan referensi aplikasi IOS dan kode warna Informatika ITTS, yaitu `#d9c37e`.

### 2.4 Mahasiswa mampu menerapkan konsep dasar networking pada React Native

#### 2.4.1 Ambil data untuk daftar berita ataupun detail berita dengan memanfaatkan endpoint API

Endpoint API: https://raw.githubusercontent.com/dauditts/pm-static-api/main/articles.json

Proses ini dilakukan di halaman `ArticlesScreen.jsx`. Kemudian, siapkan state untuk menyimpan data dan melakukan loading.

```jsx
/* other code */
const [isLoading, setIsLoading] = useState(false);
const [articles, setArticles] = useState([]);
/* other code */
```

Proses utama dilakukan, yaitu mengambil data menggunakan fungsi `getArticles`.

```jsx
const getArticles = async () => {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/dauditts/pm-static-api/main/articles.json',
    );
    const json = await response.json();
    setArticles(json.articles);
  } catch (error) {
    Alert.alert(
      'Error',
      'There was an error fetching articles. Please try again later.',
    );
  } finally {
    setIsLoading(false);
  }
};
```

Kemudian, gunakan `useEffect` untuk menjalankan side effect pada component.

```jsx
useEffect(() => {
  setIsLoading(true);
  getArticles();
}, []);
```

Dengan ini, data telah berhasil diambil dari endpoint tadi.

Kode lengkap dari setiap komponen yang terlibat dapat dilihat di Lampiran 1:

* `screens/ArticlesScreen.jsx`

## Lampiran

### Lampiran 1. Source Code

#### App.jsx

```jsx
import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';

import { WelcomeScreen, ArticlesScreen, ArticleDetailScreen } from './screens';
import { BackButton } from './components';

const Stack = createNativeStackNavigator();

const CharterRegular = require('./assets/fonts/Charter-Regular.otf');
const CharterBold = require('./assets/fonts/Charter-Bold.otf');

export default function App() {
  const [fontsLoaded] = useFonts({
    'Charter-Regular': CharterRegular,
    'Charter-Bold': CharterBold,
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  }

  SplashScreen.hideAsync();

  const screenOptions = {
    headerTitleAlign: 'center',
    headerStyle: { backgroundColor: '#d4af37' },
    headerTitleStyle: { fontFamily: 'Charter-Bold', color: 'white' },
    headerLeft: BackButton,
  };

  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={screenOptions}
        >
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Articles"
            component={ArticlesScreen}
            options={{
              title: 'Articles',
            }}
          />
          <Stack.Screen
            name="ArticleDetail"
            component={ArticleDetailScreen}
            options={{
              title: 'Article Detail',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
```

#### screens/index.js

```js
import ArticleDetailScreen from './ArticleDetailScreen';
import ArticlesScreen from './ArticlesScreen';
import WelcomeScreen from './WelcomeScreen';

export { ArticleDetailScreen, ArticlesScreen, WelcomeScreen };
```

#### screens/WelcomeScreens.jsx

```jsx
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image, Box, Text } from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SocialMediaTile, ActionButton, SizedBox } from '../components';

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

  return (
    <SafeAreaView
      style={{
        ...styles.screenContainer,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
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
```

#### screens/ArticlesScreen.jsx

```jsx
import { Box } from '@gluestack-ui/themed';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, ActivityIndicator, FlatList } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';

import { ArticleTile } from '../components';

SplashScreen.preventAutoHideAsync();

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
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
        'https://raw.githubusercontent.com/dauditts/pm-static-api/main/articles.json',
      );
      const json = await response.json();
      setArticles(json.articles);
    } catch (error) {
      Alert.alert(
        'Error',
        'There was an error fetching articles. Please try again later.',
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
        <ArticleTile article={article.item} onPress={() => pressHandler()} />
      </Box>
    );
  }

  return (
    <Box style={styles.screenContainer}>
      {isLoading || articles.length === 0 ? (
        <Box style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#d4af37" />
        </Box>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item) => renderArticles(item)}
        />
      )}
    </Box>
  );
}
```

#### screens/ArticleDetailScreen.jsx

```jsx
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
```

#### components/index.js

```js
import ActionButton from './ActionButton';
import BackButton from './BackButton';
import ArticleTile from './ArticleTile';
import SocialMediaTile from './SocialMediaTile';
import SizedBox from './SizedBox';

export { ActionButton, BackButton, ArticleTile, SocialMediaTile, SizedBox };
```

#### components/ActionButton.jsx

```jsx
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
```

#### components/ArticleTile.jsx

```jsx
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
```

#### components/BackButton.jsx

```jsx
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

export default function BackButton() {
  const navigation = useNavigation();

  return (
    <Icon
      name="left"
      size={24}
      color="white"
      onPress={() => navigation.goBack()}
    />
  );
}
```

#### components/SizedBox.jsx

```jsx
import React from 'react';
import { Box } from '@gluestack-ui/themed';
import PropTypes from 'prop-types';

export default function SizedBox({ height, width }) {
  return <Box height={height} width={width} />;
}

SizedBox.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};

SizedBox.defaultProps = {
  height: 0,
  width: 0,
};
```

#### SocialMediaTile.jsx

```jsx
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
```

### Lampiran 2. Screenshot Aplikasi

#### Halaman Welcome

![](./assets/report/welcome-screen.png)

#### Halaman Articles

![](./assets/report/articles-screen.png)

#### Halaman ArticleDetail

![](./assets/report/article-detail-screen.png)

#### Read More Article di Browser

![](./assets/report/read-more-article.png)