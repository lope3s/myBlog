import React, { useRef } from 'react';
import { Animated, StyleSheet, Easing, Text, View } from 'react-native';

interface IInformationModal {
    text: string
}

export const InformationModal: React.FC<IInformationModal> = ({text, children}) => {
    const animatedView = useRef(new Animated.Value(-350)).current;

    const forwardAnimation = Animated.timing(
        animatedView,
        {
            toValue: 2,
            easing: Easing.sin,
            duration: 750,
            useNativeDriver: true
        }
    )

    const backwardAnimation = Animated.timing(
        animatedView,
        {
            toValue: -350,
            duration: 750,
            useNativeDriver: true,  
        }
    )

    Animated.sequence([
        forwardAnimation,
        Animated.delay(250),
        backwardAnimation
    ]).start()


    const animatedStyles = {
        position: "absolute" as any,
        bottom: 50,
        transform: [
            {
                translateX: animatedView
            }
        ]
    }

    return (
        <Animated.View style = {[styles.box, animatedStyles]}>
            <View style={styles.iconBox}>
                {children}
            </View>
            <Text style = {styles.text}>{text}</Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    box: {
        width: "75%",
        height: "5%",
        backgroundColor: "#09071F",
        borderRadius: 5,
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        elevation: 10
    },
    text: {
        color: "#FFFFFF",
        margin: 0
    },
    iconBox: {
        height: "100%",
        width: "20%",
        marginRight: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})