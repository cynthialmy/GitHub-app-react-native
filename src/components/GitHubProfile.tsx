import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useQuery, gql} from '@apollo/client';
import {RepoItem} from './RepoItem';

const GET_VIEWER = gql`
  query GetViewer($after: String, $orderBy: RepositoryOrder) {
    viewer {
      login
      name
      bio
      repositories(first: 10, after: $after, orderBy: $orderBy) {
        nodes {
          id
          name
          description
          createdAt
          updatedAt
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

type SortOrder =
  | 'CREATED_ASC'
  | 'CREATED_DESC'
  | 'UPDATED_ASC'
  | 'UPDATED_DESC';

export function GitHubProfile(): React.JSX.Element {
  const [sortOrder, setSortOrder] = useState<SortOrder>('UPDATED_DESC');

  const {loading, error, data, fetchMore} = useQuery(GET_VIEWER, {
    variables: {
      orderBy: {
        field: sortOrder.startsWith('CREATED') ? 'CREATED_AT' : 'UPDATED_AT',
        direction: sortOrder.endsWith('DESC') ? 'DESC' : 'ASC',
      },
    },
  });

  const handleLoadMore = () => {
    if (data?.viewer?.repositories?.pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          after: data.viewer.repositories.pageInfo.endCursor,
          orderBy: {
            field: sortOrder.startsWith('CREATED')
              ? 'CREATED_AT'
              : 'UPDATED_AT',
            direction: sortOrder.endsWith('DESC') ? 'DESC' : 'ASC',
          },
        },
        updateQuery: (prev, {fetchMoreResult}) => {
          if (!fetchMoreResult) return prev;
          return {
            viewer: {
              ...fetchMoreResult.viewer,
              repositories: {
                ...fetchMoreResult.viewer.repositories,
                nodes: [
                  ...prev.viewer.repositories.nodes,
                  ...fetchMoreResult.viewer.repositories.nodes,
                ],
              },
            },
          };
        },
      });
    }
  };

  const handleSort = (newOrder: SortOrder) => {
    setSortOrder(newOrder);
  };

  if (loading && !data) {
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

      <View style={styles.sortContainer}>
        <Text style={styles.sectionTitle}>Repositories</Text>
        <View style={styles.sortButtons}>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortOrder === 'UPDATED_DESC' && styles.activeSortButton,
            ]}
            onPress={() => handleSort('UPDATED_DESC')}>
            <Text style={styles.sortButtonText}>Newest Updates</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortOrder === 'CREATED_DESC' && styles.activeSortButton,
            ]}
            onPress={() => handleSort('CREATED_DESC')}>
            <Text style={styles.sortButtonText}>Newest Created</Text>
          </TouchableOpacity>
        </View>
      </View>

      {data.viewer.repositories.nodes.map(repo => (
        <RepoItem key={repo.id} repo={repo} onRefetch={() => {}} />
      ))}

      {data.viewer.repositories.pageInfo.hasNextPage && (
        <TouchableOpacity
          style={styles.loadMoreButton}
          onPress={handleLoadMore}
          disabled={loading}>
          <Text style={styles.loadMoreText}>
            {loading ? 'Loading...' : 'Load More'}
          </Text>
        </TouchableOpacity>
      )}
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
  sortContainer: {
    flexDirection: 'column',
    padding: 16,
  },
  sortButtons: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
  sortButton: {
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
  },
  activeSortButton: {
    backgroundColor: '#0366D6',
  },
  sortButtonText: {
    fontSize: 12,
    color: '#24292E',
  },
  loadMoreButton: {
    backgroundColor: '#0366D6',
    padding: 12,
    borderRadius: 6,
    margin: 16,
    alignItems: 'center',
  },
  loadMoreText: {
    color: 'white',
    fontWeight: '600',
  },
});
