import 'react-native-gesture-handler';
// Components
import { NavigationContainer } from "@react-navigation/native";
import Navigation from './src/nav/Navigation';

export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}
