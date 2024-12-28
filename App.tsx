/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {ApolloProvider} from '@apollo/client';
import {client} from './src/apollo/client';
import {GitHubProfile} from './src/components/GitHubProfile';

function App(): React.JSX.Element {
  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={styles.root}>
        <StatusBar barStyle="dark-content" />
        <GitHubProfile />
      </SafeAreaView>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F6F8FA',
  },
});

export default App;
