import "react-native-gesture-handler";
// Components
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./src/UserContext";
import Navigation from "./src/nav/Navigation";

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </UserProvider>
  );
}
