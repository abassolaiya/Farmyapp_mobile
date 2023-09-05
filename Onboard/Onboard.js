import React from 'react';
import { StatusBar, Image, View, Text, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { AntDesign } from '@expo/vector-icons';
import colors from '../configs/colors';

const { width, height } = Dimensions.get('window');



const data = [
  {
    title: 'Buy ',
    title2: 'from your favorite stores',
    title3: '\n and farmers',
    text: 'There are a wide range of stores, malls, and restaurants\n in your location. You can choose as you like.',
    image: require('../assets/images/store.png'),
  },
  {
    title: 'Refer ',
    title2: 'and Earn Shopping',
    title3: '\n Coupon',
    text: 'Invite your friends and\nEarn shopping coupon on every purchase\nthey make',
    image: require('../assets/images/referral.png'),
  },
  {
    title: 'Earn ',
    title2: 'as a Delivery Agent',
    text: 'Earn more by joining \n Farmyapp as a logistics company',
    image: require('../assets/images/delivery.png'),
  },
];

const Onboard = ({ handleDone }) => {
  const renderDoneButton = () => (
    <View style={styles.nextBox}>
      <AntDesign name="arrowright" size={24} color="white" style={styles.arrow} />
    </View>
  );

  const renderNextButton = () => (
    <View style={styles.nextBox}>
      <AntDesign name="arrowright" size={24} color="white" style={styles.arrow} />
    </View>
  );

  const renderPrevButton = () => (
    <View style={styles.nextBox}>
      <AntDesign name="arrowleft" size={24} color="white" style={styles.arrow} />
    </View>
  );

  const keyExtractor = (item) => item.title;

  const renderItem = ({ item }) => (
    <View style={styles.slides}>
      <View style={styles.imageBox}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.introTextBox}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.title2}>{item.title2}</Text>
        </View>
        <Text style={styles.title3}>{item.title3}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <AppIntroSlider
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        data={data}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        renderPrevButton={renderPrevButton}
        showPrevButton
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        onDone={handleDone}
      />
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  slides: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  imageBox: {
    width: width * 0.8,
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '60%',
    height: '60%',
    aspectRatio: 1,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 10,
  },
  introTextBox: {
    flex: 6,
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    fontFamily: 'RalewayBold',
    color: colors.primary,
  },
  title2: {
    fontSize: 28,
    textAlign: 'center',
    fontFamily: 'RalewayBold',
  },
  title3: {
    fontSize: 28,
    textAlign: 'center',
    marginTop: -24,
    fontFamily: 'RalewayBold',
  },
  text: {
    color: colors.gray,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'RalewayMedium',
  },
  nextBox: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginTop: -10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotStyle: {
    backgroundColor: colors.secondary,
  },
  activeDotStyle: {
    backgroundColor: colors.primary,
    width: '7%',
  },
  arrow: {
    // marginRight: 55
  },
};

export default Onboard;
