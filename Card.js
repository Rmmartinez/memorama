import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export default function Card({onPress, isTurnedOver, children}) {
    return(
        <Pressable onPress={onPress} style={isTurnedOver ? styles.cardUp : styles.cardDown}> 
        {isTurnedOver ? (
            <Text style={styles.text}>{children}</Text>

        ) : (
            <Text style={styles.text}>?</Text>

        )}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    cardUp: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        width: 100,
        height: 100,
        margin: 10,
        backgroundColor: "#A80D68",
        borderWidth:10,
        borderColor: "#880E4F",
    },
    cardDown: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        borderWidth:10,
        borderColor: "#880E4F",
        width: 100,
        height: 100,
        margin: 10,
        backgroundColor: "#A80D68"
    },
    text: {
        fontSize: 46,
        color: "#fff"
    }
})