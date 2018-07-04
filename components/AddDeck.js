import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { saveDeckTitle } from '../utils/api.js';
import { connect } from 'react-redux';
import { addDeck } from '../actions';


class AddDeck extends Component {
	state = {
		text: ''
	}
	submit = () => {
		const title = this.state.text;
		saveDeckTitle(title);
		this.props.dispatch(addDeck(title));

	}
	render(){
		return (
			<KeyboardAvoidingView behavior='padding' style={styles.container}>

				<Text style={styles.text}>What is the title of your new deck</Text>
				<TextInput
					style={styles.input}
					onChangeText={(text) => this.setState({text})}
					value={this.state.text}
					/>

				<TouchableOpacity style={styles.submitBtn} onPress={this.submit} >
					<Text style={styles.submitBtnText}>SUBMIT</Text>
				</TouchableOpacity>

			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 20
	},
	text: {
		fontSize: 30,
		textAlign: 'center'
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
		backgroundColor: 'blue',
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
	}
})

export default connect()(AddDeck);

















