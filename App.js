import { NavigationContainer } from "@react-navigation/native";
import store from "./src/redux/store/store";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider, useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DashBoard from "./src/dashBoard";
import Team from "./src/team";
import Profile from "./src/profile";

const Stack = createStackNavigator();

const Root = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Dashboard"
          screenOptions={{
            animation: "slide",
          }}
        >
          <Stack.Screen name="Dashboard" component={DashBoard} />
          <Stack.Screen name="Team" component={Team} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
