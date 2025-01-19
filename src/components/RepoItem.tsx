import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import {useMutation, gql} from '@apollo/client';

const UPDATE_REPOSITORY = gql`
  mutation UpdateRepository($repositoryId: ID!, $newName: String!) {
    updateRepository(input: {repositoryId: $repositoryId, name: $newName}) {
      repository {
        id
        name
      }
    }
  }
`;

interface RepoItemProps {
  repo: {
    id: string;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
  };
  onRefetch: () => void;
}

export function RepoItem({repo, onRefetch}: RepoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(repo.name);

  const [updateRepo, {loading: updateLoading}] = useMutation(
    UPDATE_REPOSITORY,
    {
      onCompleted: () => {
        setIsEditing(false);
        onRefetch();
        Alert.alert('Success', 'Repository name updated successfully!');
      },
      onError: error => {
        Alert.alert('Error', error.message);
      },
    },
  );

  const handleUpdate = () => {
    if (newName.trim() === '') {
      Alert.alert('Error', 'Repository name cannot be empty');
      return;
    }

    updateRepo({
      variables: {
        repositoryId: repo.id,
        newName: newName.trim(),
      },
    });
  };

  return (
    <View style={styles.repoCard}>
      {isEditing ? (
        <View>
          <TextInput
            style={styles.input}
            value={newName}
            onChangeText={setNewName}
            placeholder="Repository name"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleUpdate}
              disabled={updateLoading}>
              <Text style={styles.buttonText}>
                {updateLoading ? 'Saving...' : 'Save'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => {
                setIsEditing(false);
                setNewName(repo.name);
              }}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <View style={styles.repoHeader}>
            <Text style={styles.repoName}>{repo.name}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(true)}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          {repo.description && (
            <Text style={styles.repoDescription}>{repo.description}</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  repoCard: {
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E1E4E8',
  },
  repoName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0366D6',
  },
  repoDescription: {
    fontSize: 14,
    color: '#586069',
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E1E4E8',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  button: {
    padding: 8,
    borderRadius: 6,
    minWidth: 70,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#2EA44F',
  },
  cancelButton: {
    backgroundColor: '#6E7681',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  repoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editButton: {
    padding: 4,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
  },
  editButtonText: {
    color: '#24292E',
    fontSize: 12,
  },
});
