import { createStackNavigator } from "react-navigation";
import MainScreen from "./screens/main";

const AppNavigation = createStackNavigator({
  Home: MainScreen
});

export default AppNavigation;
