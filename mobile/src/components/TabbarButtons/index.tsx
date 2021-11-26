import React, { useState } from 'react';
import { View, Animated, Pressable, StyleSheet } from 'react-native';

interface ITabbarButton {
    translateTabbar: (value: number) => void
    value: number
}

const TabbarButtons: React.FC<ITabbarButton> = ({ children, translateTabbar, value }) => {
    const [ animatedValue, setAnimatedValue ] = useState(new Animated.Value(0))
    const [ animatedOpacity, setAnimatedOpacity ] = useState(new Animated.Value(0))
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
            <AnimatedPressable style = {[ StyleSheet.absoluteFill, styles.animatedBox, styles.opacityBox ]} onPress = {AnimateButton}>
                {children}
            </AnimatedPressable>
        </View>
    )
}

export default TabbarButtons