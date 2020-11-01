import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, TextInput, Platform, StatusBar, SafeAreaView, ImageBackground } from 'react-native';
import { sendPushNotification } from '../../utils/Notifications'
import { sendData, getData } from '../../utils/Firebase';
import Res from '@resources';

export default class FTCWorkshopAdminPage extends Component {
    state = {
        event: '',
        question: '',
        answer: '',
        winner: '[winner displayed here]'
    };

    onChangeEvent = (nEvent) => this.setState({ event: nEvent });

    onChangeQuestion = (nQuestion) => this.setState({ question: nQuestion });

    onChangeAnswer = (nAnswer) => this.setState({ answer: nAnswer });

    getWinner = async () => {
        let query = [
            {
                field: 'event',
                op: '==',
                value: this.state.event
            },
            {
                field: 'question',
                op: '==',
                value: this.state.question
            },
            {
                field: 'answer',
                op: '==',
                value: this.state.answer
            }
        ];
        let winnerArr = await getData('ftc-responses', 'timestamp', 'asc', 1, query);
        if(winnerArr[0]) {
            let winner = winnerArr[0];
            this.setState({ winner: `${winner.event}\'s winner for question ${winner.question} is ${winner.name} from ${winner.school}!` });
        } else {
            this.setState({ winner: 'The specified Event or Question does not exist or nobody answered this Question correctly.' });
        }
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ImageBackground source={require('../../resources/ftc2020/images/bluelightsbackground.gif')} style={styles.image}>
                    <View style={styles.title}>
                            <Text style={styles.titleText}>Workshop Admin Station</Text>
                    </View>
                    <ScrollView 
                        contentContainerStyle={styles.scrollView}
                        showsVerticalScrollIndicator={false}
                    >   
                        <View style={styles.messageContainer}>
                            <Text style={styles.messageText}>Event:</Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={this.onChangeEvent}
                                value={this.state.event}
                            />
                        </View>
                        <View style={styles.messageContainer}>
                            <Text style={styles.messageText}>Question:</Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={this.onChangeQuestion}
                                value={this.state.question}
                            />
                        </View>
                        <View style={styles.messageContainer}>
                            <Text style={styles.messageText}>Answer:</Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={this.onChangeAnswer}
                                value={this.state.answer}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={this.getWinner}>
                                <Text style={styles.buttonText}>Get Winner</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.resultText}>{this.state.winner}</Text>
                    </ScrollView>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: Res.FTCColors.BlueLightsBackground
    },
    image: {
        flex: 1,
        resizeMode: "contain",
        justifyContent: "center",
        height: "140%"
    },
    scrollView: {
        padding: 16
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    titleText: {
        fontFamily: 'Gilberto',
        fontSize: 100,
        textAlign: 'center',
        color: '#E9C99C',
        backgroundColor: Res.FTCColors.BlueLightsBackground
    },
    messageContainer: {
        marginBottom: 5,
        backgroundColor: Res.FTCColors.BlueLightsBackground
    },
    messageText: {
        fontFamily: 'Arbutus-Slab',
        fontSize: 14,
        color: '#E9C99C'
    },
    textInput: {
        height: 24,
        borderBottomColor: '#E3AEA8',
        borderBottomWidth: 1,
        color: '#E9C99C',
        marginBottom: 5
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: Res.FTCColors.BlueLightsBackground
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Res.FTCColors.TeaGreen,
        marginVertical: 10,
        padding: 20,
        borderRadius: 10
    },
    buttonText: {
        fontFamily: 'French-Press',
        fontSize: 20,
        color: '#704346'
    },
    resultText: {
        textAlign: 'center',
        fontFamily: 'Arbutus-Slab',
        color: '#E9C99C',
        marginBottom: 40
    }
});