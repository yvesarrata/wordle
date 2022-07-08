import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import React from "react";
const WORD_LENGTH = 5;

export default function Keyboard({ setGuesses, guesses }) {
    const [letter, setLetter] = useState('');
    const row1 = "AZERTYUIOP";
    const row2 = "QSDFGHJKLM";
    const row3 = "WXCVBN⌫";

    useEffect(() => {
        if (letter == "⌫") {
            // replace last letter encoutered in guesses with empty string
            for (let i = 0; i < guesses.length; i++) {
                let guess_without_spaces = guesses[i].replace(/\s/g, "");
                if (guesses[i].length > 0 && guess_without_spaces.length < 5) {
                    let guess_i = guesses[i].replace(/\s/g, "");
                    let updatedGuess = "";
                    for (let j = 0; j < guess_i.length-1; j++) {
                        updatedGuess += guess_i[j];
                    }
                    setGuesses(guesses.slice(0, i).concat([updatedGuess]).concat(guesses.slice(i+1)));
                    setLetter("");
                    return;
                }
            }
        }
        else if (letter.length === 1) {
            for (let i = 0; i < guesses.length; i++) {
                let guess_without_spaces = guesses[i].replace(/\s/g, "");
                if (guess_without_spaces.length < WORD_LENGTH) {
                    const updated_guess = guess_without_spaces + letter + " ".repeat(WORD_LENGTH - guess_without_spaces.length - 1);
                    setGuesses(guesses.map((guess, index) => {
                        if (index === i) {
                            return updated_guess;
                        }
                        return guess;
                    }
                    ));
                    setLetter('');
                    return;
                }
            }
        }
    }, [letter]);

    return (
        <View style={styles.keyboard}>
            <View style={styles.row}>
                {row1.split('').map((letter, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => setLetter(letter)}>
                            <Text style={styles.letter}>{letter}</Text>
                        </TouchableOpacity>
                    )
                }
                )}
            </View>
            <View style={styles.row}>
                {row2.split('').map((letter, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => setLetter(letter)}>
                            <Text style={styles.letter}>{letter}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
            <View style={styles.row}>
                {row3.split('').map((letter, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => setLetter(letter)}>
                            <Text style={styles.letter}>{letter}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    keyboard: {
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    letter: {
        fontSize: 20,
        borderColor: '#000',
        padding: 11,
    },
});