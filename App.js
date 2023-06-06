import "react-native-gesture-handler";
// Components
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./src/UserContext";
import { Provider as PaperProvider } from "react-native-paper";
import Navigation from "./src/nav/Navigation";

export default function App() {
  return (
    <PaperProvider>
      <UserProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </UserProvider>
    </PaperProvider>
  );
}
