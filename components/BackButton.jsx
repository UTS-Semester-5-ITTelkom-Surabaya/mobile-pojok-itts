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
