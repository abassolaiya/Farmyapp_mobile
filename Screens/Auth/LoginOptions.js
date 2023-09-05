import {
    View, 
    StyleSheet, 
    Text, 
    SafeAreaView, 
    TouchableOpacity, 
    Alert, 
    Image, 
    Button, 
    Platform,
    Modal,
    ScrollView
} from 'react-native';


import { useState, useEffect } from 'react';
import * as LoginAuthentication from 'expo-local-authentication'
import colors from '../../configs/colors';
import { StatusBar } from 'expo-status-bar';
import GlassmorphicInput from '../../configs/GlassmorphicInput';
import CustomButton from '../../configs/CustomButton';
import CustomHr from '../../configs/CustomHr';
import { AntDesign } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from "@react-native-async-storage/async-storage"
import SearchPage from '../Home/SearchPage';

const LoginOptions = ({navigation}) =>{

    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [isFingerPrintEnrolled, setIsFingerPrintEnrolled] = useState(false)
    const [modalMessage, setModalMessage] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [userInfo, setUserInfo] = useState(null)

    // FOR GOOGLE AUTHENTICATION
    const [request, response, promptAsync] = Google.useAuthRequest({

        androidClientId:
             "29622131680-f8bogqulf1o5aniik6gbuvptgan2b00o.apps.googleusercontent.com",
        iOSClientId: 
             "29622131680-cbq3cdp2np0itjorpcrvl5fckea2q4uk.apps.googleusercontent.com",
        expoClientId: 
             "29622131680-pc1lder4o9qia7ndp5p6faonpqksq3p2.apps.googleusercontent.com"
    });

    useEffect(()=> {
        handleSignInWithGoogle()
    }, [response])

    async function handleSignInWithGoogle(){
        const user = await AsyncStorage.getItem("@users");
          
            if(response?.type === "success"){
                await getUserInfo(response.authentication.accessToken);
            }
        if (!user) {

        } else{
            setUserInfo(JSON.parse(user));
        }
    }


    // GET USER
    const getUserInfo = async(token) => {
        if (!token) return;
        try {
            const response = await fetch (
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers : { Authorization: `Bearer ${token}`},
                }
            );

            // SAVE USER LOCALLY
            const user = await response.json();
            await AsyncStorage.setItem("@users", JSON.stringify(user));
            setUserInfo(user);
        } catch(error){

        }
    }

 

    
    // SELECT ACCOUNT TYPE LOGIC
    const handleAccountPress = (accountId) => {
        setSelectedAccount(accountId);
    }

    // FOR FACE ID OR FINGERPRINT IDENTIFICATION
    useEffect(() =>{
        (async() => {
            const compatible = await LoginAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible)
        })();
    }, []);

    //CHECK IF FINGERPRINT IS ENROLLED (I think this isn't needed anyways)
        useEffect(() => {
            (async() => {
                const enrolled = await LoginAuthentication.isEnrolledAsync();
                setIsFingerPrintEnrolled = (enrolled)
            })
        })

    const fallBackToDefaultAuth = () =>{
        console.log("Fall back to default Passcode Authentication")
    }
    
    const alertComponent = (title, mess, btnTxt, btnFunc) => {
        return Alert.alert( title, mess, [
            {
                text: btnTxt,
                onPress: btnFunc
            }
        ]);
    }

    const TwoButtonsAlert = ()=>
         Alert.alert('Welcome To The App', 'Subscribe'[
            {
                text: 'Back',
                onPress: ()=> console.log("Cancel Pressed"),
                style: 'cancel'
            },
            {
                text: 'Ok', 
                onPress: ()=> console.log("ok Pressed")
            }
        ]);

    const handleBiometricAuth = async () => {
            // CHECKS IF HARDWARE SUPPORTS BIOMETRIC
            const isBiometricAvailable = await LoginAuthentication .hasHardwareAsync();

            // FALL BACK TO DIFFERENT AUTHENTICATION METHOD (PASSWORD) IF BIOMETRIC IS NOT AVAILABLE
            if (!isBiometricAvailable)
            return alertComponent(
                'Please Enter Your Password',
                'Biometric Auth not Supported',
                'Ok',
                () => fallBackToDefaultAuth()
            );

            // CHECK BIOMETRIC AUTHENTICATION AVAILABLE (FINGERPRINT, FACE ID, IRIS ID)
            let supportedBiometrics;
            if (isBiometricAvailable)
                supportedBiometrics = await LoginAuthentication.supportedAuthenticationTypesAsync()
                
            // CHECK SAVED BIOMETRICS LOCALLY
            const savedBiometrics = await LoginAuthentication.isEnrolledAsync();
            if (!savedBiometrics)
                return alertComponent (
                    'Biometric Record not found',
                    'Please login with Password',
                    'Ok',
                    () => fallBackToDefaultAuth()
                );

            //AUTHENTICATE WITH BIOMETRICS
            const biometricAuth = await LoginAuthentication.authenticateAsync({
                promptMessage: 'Login With Biometrics',
                cancelLabel: 'cancel',
                disableDeviceFallback: true
            })

            //LOGIN THE USER ON SUCCESS 
            if (biometricAuth.success) {
                TwoButtonsAlert();
            } else{
            if(biometricAuth.warning){
                setModalMessage("You cancelled the authentication");
                setModalVisible(true)
            }else{
                console.log("Biometric Authentication Failed")

            };
            console.log({isBiometricAvailable});
            console.log({supportedBiometrics});
            console.log({savedBiometrics});
            console.log({biometricAuth});
    }

}


return ( 
    <SafeAreaView style={styles.container}>
        {/* MODAL FOR WARNING MESSAGE IF BIOMETRIC AUTH FAILS */}
        <Modal
            visible={modalVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalMessage}>{modalMessage}</Text>
                    <TouchableOpacity style={styles.modalCloseButton}
                        onPress={() => setModalVisible(false)}
                    >
                        {/* <Text style={styles.modalCloseText}>Close</Text> */}
                        <Image
                            source={require("../../assets/images/close.png")}
                            style={styles.modalCloseButtonImage}
                        />
                    </TouchableOpacity>
                </View>
            </View>
         </Modal>
         {/** END OF THE MODAL **/}

           <ScrollView>
                <View style={styles.logoContainer}>
                        <Image
                            source={require("../../assets/images/flogo.png")}
                            style={styles.logo}
                        />
                </View>
                <View style={styles.categorySelector}>
                    <Text style={styles.signUpText}>Login As</Text>
                    <View style={styles.categoryContainer}>
                        <View style={styles.categoryMain}>
                            <TouchableOpacity 
                            style={[styles.categoryBox,
                             selectedAccount == 'buyerAccount' ? styles.selectedAccount : null
                             ]}
                                onPress={()=> handleAccountPress('buyerAccount')}
                             >
                                <Image
                                    source={require("./../../assets/images/buyer.png")}
                                    style={styles.categoryImage}
                                />
                                <Text style={styles.categoryText}>Buyer</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.categoryBox, selectedAccount == 'storeAccount' ? styles.selectedAccount : null]}
                                onPress={()=> handleAccountPress('storeAccount')}
                            >
                                <Image 
                                    style={styles.categoryImage}
                                    source={require("../../assets/images/store2.png")}
                                />
                                <Text style={styles.categoryText}>Store</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.categoryBox, selectedAccount == 'logisticsAccount' ? styles.selectedAccount : null]}
                                onPress={()=> handleAccountPress('logisticsAccount')}
                            >
                                <Image 
                                    style={styles.categoryImage}
                                    source={require("../../assets/images/truck.png")}
                                />
                                <Text style={styles.categoryText}>Logisitics</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.categoryBox, selectedAccount == 'farmersAccount' ? styles.selectedAccount : null]}
                                onPress={()=> handleAccountPress('farmersAccount')}
                            >
                                <Image 
                                    style={styles.categoryImage}
                                    source={require("../../assets/images/farmer.png")}
                                />
                                <Text style={styles.categoryText}>Farmer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.loginMain}>
                             <View style={styles.loginBox}>
                                <View style={styles.textInputContainer}>
                                    <GlassmorphicInput
                                        placeholder="Email Address" 
                                        
                                    />
                                </View>

                                <View style={styles.textInputContainer}>
                                    <GlassmorphicInput
                                        placeholder="Password"
                                        isPassword={true}
                                    />
                                </View>

                                <TouchableOpacity style={styles.forgotPasswordContainer}
                                    onPress={()=> navigation.navigate("ForgotPassword")}
                                >
                                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                                </TouchableOpacity>
                             </View>
                    </View>
                    <View style={styles.loginButtonBox}>

                        <CustomButton
                            buttonLabel="Login"
                            onPress={()=> navigation.navigate("FeedNavigator", {screen: SearchPage})}
                        />
                    </View>

                    <TouchableOpacity 
                        style={styles.fingerPrintLogin}
                        onPress={()=> handleBiometricAuth()}
                    >
                        <View style={styles.fingerPrintBox}>
                            <Image 
                                source={require("../../assets/images/fingerprint.png")}
                                style={styles.fingerPrintImage}
                            />
                        </View>
                    </TouchableOpacity>

                    <CustomHr
                        middleText="or"
                    />

                    <CustomButton 
                        icon={<AntDesign name="google" size={24} color="white" />}
                        buttonLabel="Sign in with Google"
                        onPress={() => {promptAsync();}}
                        
                    />

                    
                    <View style={styles.otherCTA}>
                        <Text style={styles.subCTA}>New to FarmyApp? </Text>
                        <TouchableOpacity onPress={()=>navigation.navigate("RegisterCategory")}>
                            <Text style={styles.mainCTA}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>

          
           </ScrollView>

        <StatusBar style='auto'/>
    </SafeAreaView>
   );
 }


const styles = StyleSheet.create({
container:{
    flex:1,
    paddingTop: Platform.OS == 'android' ? 25 : null
},

logo:{
    width: 53,
    height: 75
  },

modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: 'center',
  },
  modalMessage: {
    fontSize: 20,
    // color:colors.red,
    paddingVertical: 10,
    textAlign: 'center',

  },

  modalCloseButton:{
    width: 100,
    padding:8,
    alignItems:'center',
    borderRadius: 12,
  },

  modalCloseButtonImage:{
        width: 40,
        height:40
  },

logoContainer:{
    alignItems: "center",
    paddingVertical: 10,
},

signUpText:{
    textAlign: "center",
    fontSize: 20,
    paddingVertical: 10,
    fontFamily: "RalewayBold",
    color: colors.primary
  },

  categoryContainer:{
     padding: 20,
     alignItems: "center",
     justifyContent:"space-between"
  },

  categoryMain:{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-between"
  },

  categoryBox:{
    borderColor: colors.gray,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    width: "23%",
    padding: 10,
    borderRadius: 15
  },


  categoryImage:{
    width:35, 
    height:25
  },

  categoryText:{
    textAlign: "center",
    color: colors.primary,
    fontFamily: "RalewayBold",
    fontSize: 10
  },

  selectedAccount: {
    borderColor: colors.primary,
    borderWidth: 2
  },



  loginText:{
    textAlign: "center",
    fontSize: 18,
    fontFamily: "RalewayBold",
    color: colors.primary
  },

  textInputContainer:{
    paddingLeft: 20,
    paddingRight: 20,
  },

  loginButtonBox:{
    paddingVertical: 15
  },

  forgotPasswordContainer: {
    padding: 10,
    paddingHorizontal: 20,
  },

  forgotPasswordText: {
    color: colors.red,
    alignSelf:"flex-end",
    fontFamily: "RalewaySemiBold",
  },

  fingerPrintLogin: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  fingerPrintBox:{
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    shadowColor: "#000000",
      shadowOffset: {
          width: -1.5,
          height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 2,
      elevation: 10

  },

  fingerPrintImage: {
    width: 45,
  },

  otherCTA:{
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  
  subCTA:{
    fontFamily: "RalewayMedium",
  
  },
  mainCTA:{
    fontFamily: "RalewayBold",
    color: colors.primary
  }
 })


export default LoginOptions;
