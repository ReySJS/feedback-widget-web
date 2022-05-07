import React from 'react';
import { View, Text } from 'react-native';
import { API_BASE_URL } from '@env';

import { styles } from './styles';

export function Copyright() {
  return (
    <View>
      <Text style={styles.text}>Desenvolvido por Rey</Text>
    </View>
  );
}
