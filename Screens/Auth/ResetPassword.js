import React from 'react';
import {View, StyleSheet, SafeAreaView, Image, Text} from 'react-native';
import GlassmorphicInput from '../../configs/GlassmorphicInput';
import colors from '../../configs/colors';
import CustomButton from '../../configs/CustomButton';


const ResetPassword = ({navigation}) => {
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
                    Enter the OTP sent to ifefisayo@gmail.com
                    </Text>
                </View>

                <View style={styles.textInputContainer}>
                    {/* Input fields */}
                    <GlassmorphicInput
                        placeholder="Enter new password"
                        style={styles.textInput}
                    />

                    <GlassmorphicInput
                        placeholder="Confirm New Password"
                        style={styles.textInput}
                    />
                  </View>
                </View>
                <CustomButton
                    buttonLabel= "Verify"
                    onPress={()=> navigation.navigate("SearchPage")}
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
export default ResetPassword;