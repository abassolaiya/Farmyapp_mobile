import {Text, View, StyleSheet, SafeAreaView, Image} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import colors from '../../configs/colors';
import GlassmorphicInput from '../../configs/GlassmorphicInput';
import CustomButton from '../../configs/CustomButton'

const ForgotPassword = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>
                <View>
                    <Image 
                        style={styles.logo}
                        source={require("../../assets/images/flogo.png")}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textHeader}>Forgot Password</Text>
                    <Text style={styles.textBody}>
                        Don’t worry this happens 😁{'\n'}
                        Enter your email to get a code to reset your password
                    </Text>
                </View>

                <View style={styles.textInputContainer}>
                    {/* Input fields */}
                    <GlassmorphicInput
                        placeholder="Enter your email"
                        style={styles.textInput}
                    />
                  </View>
            </View>
                <CustomButton
                        buttonLabel= "Send Code"
                        onPress={()=> navigation.navigate("OtpScreen")}
                />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: Platform.OS == 'android' ? 20 : null,
        alignItems: "center",
        justifyContent: 'center',

    },

    main:{
        alignItems: "center",
        justifyContent: 'center',
    },

    logo:{
        width: 53,
        height: 75
      },

      textHeader:{
        textAlign: "center",
        fontSize: 20,
        paddingVertical: 10,
        fontFamily: "RalewayBold",
        color: colors.primary
      },

      textBody:{
        textAlign: "center",
        color: colors.gray
      },

      textContainer:{
        padding: 20,
        
      },

      textInputContainer: {
        width: "100%"
      },

      textInput:{
        width: "100%",
        borderWidth: 1
      }
})

export default ForgotPassword;