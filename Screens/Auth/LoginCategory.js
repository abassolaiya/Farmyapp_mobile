import React, { useState } from 'react';
import {View, StyleSheet, Text, Image, SafeAreaView} from 'react-native';
import colors from '../../configs/colors';
import { TouchableOpacity } from 'react-native';


const LoginCategory = ({navigation}) => {

    const [selectedAccount, setSelectedAccount] = useState(null)

      // SELECT ACCOUNT TYPE LOGIC
      const handleAccountPress = (accountId) => {
        setSelectedAccount(accountId);
    }

return (
<SafeAreaView style={styles.container}>
    <View style={styles.logoContainer}>
          <Image
             source={require("../../assets/images/flogo.png")}
             style={styles.logo}
          />
    </View>
        {/* <Text style={styles.welcomeText}>Hi, We've expecting you!</Text> */}
        <Text style={styles.signUpText}>Select Account Type</Text>

        <View style={styles.categoryContainer}>
            <TouchableOpacity 
            style={[styles.categoryBox]}
            onPress={()=>navigation.navigate("LoginOptions")}
            >
                  <Image
                    source={require("../../assets/images/buyer.png")}
                    style={styles.categoryImage}
                  />

                <Text style={styles.categoryText}>
                      Buyer  
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.categoryBox}>
                  <Image
                    source={require("../../assets/images/store2.png")}
                    style={styles.categoryImage}
                  />

                <Text style={styles.categoryText}>
                      Store  
                </Text>
            </TouchableOpacity>
        </View>

        <View style={styles.categoryContainer}>
            <TouchableOpacity style={styles.categoryBox}>
                  <Image
                    source={require("../../assets/images/truck.png")}
                    style={styles.categoryImage}
                  />

                <Text style={styles.categoryText}>
                      Logisitics  
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.categoryBox}>
                  <Image
                    source={require("../../assets/images/farmer.png")}
                    style={styles.categoryImage}
                  />

                <Text style={styles.categoryText}>
                      Farmer  
                </Text>
            </TouchableOpacity>
        </View>

        <View style={styles.otherCTA}>
            <Text style={styles.subCTA}>Already have an account? </Text>
            <TouchableOpacity onPress={()=>navigation.navigate("RegisterCategory")}>
                <Text style={styles.mainCTA}>Register</Text>
            </TouchableOpacity>
        </View>
</SafeAreaView>
   );
 }


const styles = StyleSheet.create({
container:{
    flex: 1,
    paddingTop: Platform.OS == 'android' ? 40 : null
},
logoContainer:{
  alignItems: "center",
  marginTop: 20
},

logo:{
  width: 53,
  height: 75
},

welcomeText:{
  textAlign: "center",
  fontSize: 20,
  fontFamily: "RalewayBold"
},

signUpText:{
  textAlign: "center",
  fontSize: 20,
  paddingVertical: 15,
  fontFamily: "RalewayBold",
  color: colors.primary
},

categoryContainer:{
  flexDirection:"row",
  padding: 40,
  justifyContent: "space-between"
},

categoryBox:{
  borderColor: colors.primary,
  borderWidth: 2,
  alignItems: "center",
  justifyContent: "center",
  width: "48%",
  height: 160,
  borderRadius: 20
},

categoryImage:{
  // borderRadius: 50,
  
},

categoryText:{
  textAlign: "center",
  fontFamily: "RalewayBold",
  fontSize: 20,
  marginTop: 15,
  color: colors.primary
},

otherCTA:{
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
export default LoginCategory;