import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { addCard } from '../actions';
import { addCardToDeck, getDeck } from '../utils/api.js';



class AddCard extends Component {
	state = {
		question: '',
		answer: '',
	}

	submit = () => {
		const title = this.props.navigation.state.params.title;
		const card = {
			question: this.state.question,
			answer: this.state.answer
		}
		addCardToDeck(title, card);
		this.props.dispatch(addCard(card, title));
		this.setState({question: '', answer: ''});
		this.props.navigation.goBack();
	}

	render(){
		const navigation = this.props.navigation
		return (
			<KeyboardAvoidingView behavior='padding' style={styles.container}>
				<View style={{flex: 1, padding: 20}}>
					<ScrollView  >
						<Text style={styles.instructions}>Enter Question:</Text>
						<TextInput
							style={styles.input}
							onChangeText={(question) => this.setState({question})}
							value={this.state.question}
							multiline={true}
							numberOfLines={4}
						/>
						<Text style={styles.instructions}>Enter Answer:</Text>
						<TextInput
							style={styles.input}
							onChangeText={(answer) => this.setState({answer})}
							value={this.state.answer}
							multiline={true}
							numberOfLines={4}
						/>
					</ScrollView>
					<View style={{padding: 20}}>
						<TouchableOpacity style={styles.submitBtn} onPress={this.submit} >
							<Text style={styles.submitBtnText}>SUBMIT</Text>
						</TouchableOpacity>
					</View>

				</View>
			</KeyboardAvoidingView>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 20,
	},
	input: {
		padding: 10,
		borderColor: 'black',
		borderStyle: 'solid',
		borderRadius: 2,
		borderWidth: 1,
		marginTop: 20,
		marginBottom: 20,
	},
	submitBtn: {
		backgroundColor: 'rgb(0, 122, 255)',
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		height: 45,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
	},
	submitBtnText: {
		color: 'white',
		fontSize: 22,
		textAlign: 'center'
	},
	instructions: {
		fontSize: 18
	}
})

export default connect()(AddCard);






