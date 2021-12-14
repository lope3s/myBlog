import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Animated} from 'react-native';
import {Svg, Path} from 'react-native-svg';
import * as shape from 'd3-shape';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import IOIcon from 'react-native-vector-icons/Ionicons';
import TabbarButtons from '../TabbarButtons';

const {width} = Dimensions.get('window');
const tabWidth = width / 3;

const AnimatedSVG = Animated.createAnimatedComponent(Svg);

const left = shape
  .line<{x: number; y: number}>()
  .x((d: any) => d.x)
  .y((d: any) => d.y)([
  {x: 0, y: 0},
  {x: width, y: 0},
]);

const tab = shape
  .line<{x: number; y: number}>()
  .x((d: any) => d.x)
  .y((d: any) => d.y)
  .curve(shape.curveBasis)([
  {x: width, y: 0},
  {x: width + 20, y: 0},
  {x: width + 30, y: 10},
  {x: width + 40, y: 50},
  {x: width + tabWidth - 40, y: 50},
  {x: width + tabWidth - 30, y: 10},
  {x: width + tabWidth - 20, y: 0},
  {x: width + tabWidth, y: 0},
]);

const right = shape
  .line<{x: number; y: number}>()
  .x((d: any) => d.x)
  .y((d: any) => d.y)([
  {x: width + tabWidth, y: 0},
  {x: width * 2.5, y: 0},
  {x: width * 2.5, y: 64},
  {x: 0, y: 64},
  {x: 0, y: 0},
]);

const d = `${left} ${tab} ${right}`;

interface ITabbar {
  navigation: any;
}

const Tabbar: React.FC<ITabbar> = ({navigation}) => {
  const [widthTranslate] = useState(new Animated.Value(-width));

  const translateTabbar = (value: number) => {
    Animated.spring(widthTranslate, {
      toValue: -width + tabWidth * value,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{width, height: 64, backgroundColor: '#1F1D36'}}>
      <AnimatedSVG
        {...{width: width * 2.5, height: 64}}
        style={{transform: [{translateX: widthTranslate}]}}>
        <Path {...{d}} fill="#A06083" />
      </AnimatedSVG>
      <View style={[StyleSheet.absoluteFill, styles.buttonsBox]}>
        <TabbarButtons
          translateTabbar={translateTabbar}
          value={0}
          navigation={navigation}
          name="Home">
          <FAIcon name="home" size={35} color="#fff" />
        </TabbarButtons>
        <TabbarButtons
          translateTabbar={translateTabbar}
          value={1}
          navigation={navigation}
          name="Post">
          <IOIcon
            name="add-circle-outline"
            size={35}
            color="#fff"
            style={{marginLeft: 3}}
          />
        </TabbarButtons>
        <TabbarButtons
          translateTabbar={translateTabbar}
          value={2}
          navigation={navigation}
          name="Profile">
          <IOIcon name="person-circle-outline" size={35} color="#fff" />
        </TabbarButtons>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default Tabbar;
