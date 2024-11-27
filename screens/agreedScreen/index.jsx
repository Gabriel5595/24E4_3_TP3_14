import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const AgreedScreen = ({ propositions, userOpinions }) => {
  if (!propositions || !userOpinions) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  const agreedPropositions = propositions.filter(
    (item) => userOpinions[item.id] === 'agree'
  );

  return (
    <FlatList
      data={agreedPropositions}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.title}>{item.ementa || 'Sem título'}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AgreedScreen;
