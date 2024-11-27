import { FlatList, View, Text, Button, StyleSheet } from 'react-native';

const PropositionsScreen = ({ propositions, userOpinions, setUserOpinions }) => {
  const handleOpinion = (id, opinion) => {
    setUserOpinions((prev) => ({ ...prev, [id]: opinion }));
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.ementa || 'Sem título'}</Text>
      {userOpinions[item.id] ? (
        <Text>Opinião registrada: {userOpinions[item.id] === 'agree' ? 'Concordo' : 'Discordo'}</Text>
      ) : (
        <View style={styles.buttons}>
          <Button title="Concordo" onPress={() => handleOpinion(item.id, 'agree')} />
          <Button title="Discordo" onPress={() => handleOpinion(item.id, 'disagree')} />
        </View>
      )}
    </View>
  );

  return (
    <FlatList
      data={propositions}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});

export default PropositionsScreen;
