import React, { useState } from 'react';
import { View, Animated, Pressable, StyleSheet } from 'react-native';

interface ITabbarButton {
    translateTabbar: (value: number) => void
    value: number
    name: string
    navigation: any
}

const TabbarButtons: React.FC<ITabbarButton> = ({ children, translateTabbar, value, name, navigation }) => {
    const routes = navigation.getState().history
    const routeName = routes.length ? routes[routes.length - 1].key.split('-')[0] : "Home"
    const [ animatedValue ] = useState(new Animated.Value(0))
    const [ animatedOpacity ] = useState(new Animated.Value(0))
    const [ displayChildren, setDisplayChildren ] = useState(true)

    
    const AnimateButton = () => {
        translateTabbar(value)
        setDisplayChildren(false)
        Animated.parallel([
            Animated.spring(animatedOpacity, {
                toValue: 1,
                useNativeDriver: true
            }),
            Animated.spring(animatedValue, {
                toValue: -25,
                useNativeDriver: true,
            })
        ]).start()
    }

    const DeAnimateButton = () => {
        Animated.parallel([
            Animated.spring(animatedValue, {
                toValue: 0,
                useNativeDriver: true,
            }),
            Animated.spring(animatedOpacity, {
                toValue: 0,
                useNativeDriver: true
            })
        ]).start()
        setDisplayChildren(true)
    }

    if (name === routeName && displayChildren) {
        AnimateButton()
    }

    if (!displayChildren && name !== routeName) {
        DeAnimateButton()
    }

    const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

    const styles = StyleSheet.create({
        animatedBox: {
            width: 35,
            transform: [{translateY: animatedValue as any}]
        },
        box: {
            width: 50,
            height: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        opacityBox: {
            width: 50,
            height: 50,
            display: 'flex',
            borderRadius: 100,
            backgroundColor: "#1F1D36",
            justifyContent: 'center',
            alignItems: 'center',
            opacity: animatedOpacity as any
        }
    })

    return (
        <View style = {[ styles.box ]}>
            { displayChildren && children}
            <AnimatedPressable style = {[ StyleSheet.absoluteFill, styles.animatedBox, styles.opacityBox ]} onPress = {() => navigation.navigate({name, merge: true})}>
                {children}
            </AnimatedPressable>
        </View>
    )
}

export default TabbarButtons