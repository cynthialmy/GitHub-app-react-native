import React from 'react';
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useQuery, gql} from '@apollo/client';
import {RepoItem} from './RepoItem';

const GET_VIEWER = gql`
  query GetViewer {
    viewer {
      login
      name
      bio
      repositories(first: 10) {
        nodes {
          id
          name
          description
        }
      }
    }
  }
`;

export function GitHubProfile(): React.JSX.Element {
  const {loading, error, data, refetch} = useQuery(GET_VIEWER);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.title}>{data.viewer.name}</Text>
        <Text style={styles.subtitle}>@{data.viewer.login}</Text>
        {data.viewer.bio && <Text style={styles.bio}>{data.viewer.bio}</Text>}
      </View>

      <Text style={styles.sectionTitle}>Repositories</Text>
      {data.viewer.repositories.nodes.map(repo => (
        <RepoItem key={repo.id} repo={repo} onRefetch={refetch} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E4E8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#24292E',
  },
  subtitle: {
    fontSize: 16,
    color: '#586069',
    marginTop: 4,
  },
  bio: {
    fontSize: 16,
    color: '#24292E',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#24292E',
    margin: 16,
  },
  errorText: {
    color: '#cb2431',
    fontSize: 16,
  },
});
