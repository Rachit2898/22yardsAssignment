import { NavigationContainer } from "@react-navigation/native";
import store from "./src/redux/store/store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DashBoard from "./src/dashBoard";
import Team from "./src/team";
import Profile from "./src/profile";

const Stack = createNativeStackNavigator();

const Root = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={DashBoard} />
        <Stack.Screen name="Team" component={Team} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Root />
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
