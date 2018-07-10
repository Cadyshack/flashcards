import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { shuffleArray } from '../utils/helpers.js';


class Quiz extends Component {
	state = {
		index: 0,
		showAnswer: false,
		correct: 0,
		finished: false,
	}
	nextQuestion = () => {
		const {index, correct} = this.state;
		const totalCards = this.props.cards.length;
		if (index + 1 < totalCards){
			this.setState((prevState) => {
				return {
					index: prevState.index + 1,
					showAnswer: false
				}
			})
		} else {
			this.setState({finished: true})
		}
	}
	restartQuiz = () => {
		this.setState({
			index: 0,
			showAnswer: false,
			correct: 0,
			finished: false,
		})
	}

	render(){
		const { cards } = this.props;
		const { index, showAnswer, finished, correct } = this.state;
		const totalCards = cards.length;
		const currentCard = index + 1;
		const percent = Math.round((correct/totalCards) * 100);
		if (!finished){
			return (
				<View style={styles.container}>
					<Text style={{fontSize: 18}} >{currentCard}/{totalCards}</Text>
					<View style={styles.quiz}>
						<ScrollView style={styles.quizTop} >
							<View style={styles.question}>
								<Text style={{fontSize: 20}}>
									{cards[index].question}
								</Text>
							</View>
							<TouchableOpacity style={styles.btnShowAnswer}
								onPress={() => this.setState((prevState) => {
									return {
										showAnswer: !prevState.showAnswer
									}
								})}
							 >
								<Text style={{color: 'white'}} >
								{showAnswer ? 'HIDE ANSWER' : 'SHOW ANSWER'}
								</Text>
							</TouchableOpacity>
						{showAnswer && (
							<View style={styles.answer}>
							<Text style={{fontSize: 20}} >
								{cards[index].answer}
							</Text>
							</View>
						)}
						</ScrollView>
						<View style={{marginTop: 20}} >
							<TouchableOpacity style={[styles.btn, styles.btnCorrect]}
								onPress={() => {
									this.setState((prevState) => {
										return {
											correct: prevState.correct + 1
										}
									}, this.nextQuestion)
								}}
							>
								<Text style={styles.btnText}>CORRECT</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[styles.btn, styles.btnIncorrect]}
								onPress={this.nextQuestion}
							>
								<Text style={styles.btnText}>INCORRECT</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			)
		} else {
			return (
				<View style={styles.results} >

					<View>
						<Text style={styles.score}>Score = {correct}/{totalCards}</Text>
						<Text style={styles.score}>{percent}%</Text>
					</View>

					<View>
						<TouchableOpacity style={styles.btn}
							onPress={this.restartQuiz}
						>
							<Text style={styles.btnText}>RESTART QUIZ</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.btn, {marginTop: 20}]}
							onPress={() => this.props.navigation.goBack()}
						>
							<Text style={styles.btnText}>BACK TO DECK</Text>
						</TouchableOpacity>
					</View>


				</View>
			)
		}

	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	quiz: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: 20,
	},
	question: {
		width: '100%',
		padding: 20,
		marginBottom: 20,
		backgroundColor: 'rgb(210, 210, 130)',
		borderRadius: 5,
		alignItems: 'center'
	},
	quizTop: {
		width: '100%'
	},
	btnShowAnswer: {
		marginTop: 20,
		marginBottom: 20,
		borderRadius: 5,
		paddingRight: 20,
		paddingLeft: 20,
		paddingTop: 5,
		paddingBottom: 5,
		width: 'auto',
		backgroundColor: 'rgb(0, 122, 255)',
		alignSelf: 'center'
	},
	answer: {
		padding: 20,
		marginBottom: 20,
		backgroundColor: 'rgb(182, 221, 182)',
		borderRadius: 5,
		alignItems: 'center'
	},
	btn: {
		backgroundColor: 'rgb(0, 122, 255)',
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		height: 45,
		width: 250,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
	},
	btnText: {
		color: 'white',
		fontSize: 22,
		textAlign: 'center'
	},
	btnCorrect: {
		backgroundColor: 'rgb(76, 217, 100)'
	},
	btnIncorrect: {
		backgroundColor: 'rgb(255, 59, 48)',
		marginTop: 20
	},
	results: {
		flex: 1,
		justifyContent: 'space-between',
		padding: 20
	},
	score: {
		textAlign: 'center',
		fontSize: 30,
		margin: 20,
	}
})

function mapStateToProps ( state, ownProps ) {
	const { title } = ownProps.navigation.state.params;
	const shuffledCards = state[title].questions;
	shuffleArray(shuffledCards);
	return {
		cards: shuffledCards
	}
}
export default connect(mapStateToProps)(Quiz);



















