import 'react-native-gesture-handler';
import { StyleSheet} from 'react-native';
// Components
import { NavigationContainer } from "@react-navigation/native";
import Navigation from './nav/Navigation';

export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}
