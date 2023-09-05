import { NavigationContainer } from "@react-navigation/native"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
// SCREENS IMPORT 
import SearchPage from "../../Screens/Home/SearchPage";
import Notification from "../../Screens/Notifications/Notification";
import Logistics from "../../Screens/Logistics/Logistics";
import Profile from "../../Screens/Profile/Profile";
import FeedNavigator from "./FeedNavigator";
import { Ionicons, Octicons, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons'; 
import colors from "../../configs/colors";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return(
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused  ? 'home' : 'home-outline';
              return <Ionicons name={iconName} size={20} color={color} />;

            } else if (route.name === 'Notification') {
              iconName = focused ? 'bell' : 'bell-o';
              return <FontAwesome name={iconName} size={20} color={color} />;
            } else if (route.name === 'Logistics'){
              iconName = focused ? 'truck' : 'truck-outline';
              return <MaterialCommunityIcons name={iconName} size={20} color={color}/>
            } else (route.name === 'Profile');{
              iconName = focused ? 'account' : 'account-outline';
              return <MaterialCommunityIcons name={iconName} size={20} color={color}/>
            }

        

             // Return a default icon if the route name is not found
            return null;
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.gray
        })}
      >
            <Tab.Screen
                name="Home"
                component={FeedNavigator}
                options={{
                headerShown: false
            }}
            />
             {/* <Tab.Screen
                name="SearchPage"
                component = {SearchPage}
                options={{
                headerShown: false
            }}
            />  */}

            <Tab.Screen
                name="Notification"
                component={Notification}
                options={{
                headerShown: false
            }}
            />

            <Tab.Screen
                name="Logistics"
                component={Logistics}
                options={{
                headerShown: false
            }}
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                headerShown: false
            }}
            />
        </Tab.Navigator>
    )
}

export default AppNavigator;