import {createNativeStackNavigator} from '@react-navigation/native-stack'
import LoginCategory from '../../Screens/Auth/LoginCategory';
import RegisterCategory from '../../Screens/Auth/RegisterCategory';
import LoginOptions from '../../Screens/Auth/LoginOptions';
import RegisterOptions from '../../Screens/Auth/RegisterOptions';
import ForgotPassword from '../../Screens/Auth/ForgotPassword';
import OtpScreen from '../../Screens/Auth/OtpScreen';
import ResetPassword from '../../Screens/Auth/ResetPassword';
import FeedNavigator from './FeedNavigator';

const Auth = createNativeStackNavigator();

const AuthNavigator = ()=>{
    return (
        <Auth.Navigator>
    
            {/* <Auth.Screen
                name='FeedNavigator'
                component={FeedNavigator}
                options={{
                    headerShown: false
                }}
            /> */}

            <Auth.Screen
                name="LoginCategory"
                component={LoginCategory}
                options={{
                headerShown: false
            }}
            />

            <Auth.Screen
                name="RegisterCategory"
                component={RegisterCategory}
                options={{
                headerShown: false
            }}
            />

            <Auth.Screen
                name="LoginOptions"
                component={LoginOptions}
                options={{
                headerShown: false
            }}
            />

            <Auth.Screen
                name="RegisterOptions"
                component={RegisterOptions}
                options={{
                headerShown: false
            }}
            />

            <Auth.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{
                headerShown: false
            }}
            />

            <Auth.Screen
                name="OtpScreen"
                component={OtpScreen}
                options={{
                headerShown: false
            }}
            />

            <Auth.Screen
                name="ResetPassword"
                component={ResetPassword}
                options={{
                headerShown: false
            }}
            />
        </Auth.Navigator>
    )
}

export default AuthNavigator;