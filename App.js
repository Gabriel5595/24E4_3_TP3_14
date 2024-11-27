import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PropositionsScreen from './screens/propositionScreen/index.jsx';
import AgreedScreen from './screens/agreedScreen/index.jsx';
import DisagreedScreen from './screens/disagreedScreen/index.jsx';

const Tab = createBottomTabNavigator();

export default function App() {
  const [propositions, setPropositions] = useState([]);
  const [userOpinions, setUserOpinions] = useState({});

  const fetchPropositions = async () => {
    try {
      const response = await fetch(
        'https://dadosabertos.camara.leg.br/api/v2/proposicoes?pagina=1&itens=10'
      );
      const json = await response.json();
      setPropositions(json.dados);
    } catch (error) {
      console.error('Erro ao buscar proposições:', error);
    }
  };

  useEffect(() => {
    fetchPropositions();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Proposições">
          {(props) => (
            <PropositionsScreen
              {...props}
              propositions={propositions}
              userOpinions={userOpinions}
              setUserOpinions={setUserOpinions}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Concordou">
          {(props) => (
            <AgreedScreen
              {...props}
              propositions={propositions}
              userOpinions={userOpinions}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Discordou">
          {(props) => (
            <DisagreedScreen
              {...props}
              propositions={propositions}
              userOpinions={userOpinions}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}