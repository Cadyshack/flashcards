import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AddCard from './AddCard';
import Quiz from './Quiz';

class DeckItem extends Component {

	static navigationOptions = ({ navigation }) => {
		const { title } = navigation.state.params;
		return {
			title
		}
	}

	render(){
		const {title, cardNum} = this.props.navigation.state.params;
		return (
			<View style={styles.container}>
				<View>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.card} >{`${cardNum} cards`}</Text>
				</View>
				<View>
					<TouchableOpacity style={styles.btn}
						onPress={() =>  this.props.navigation.navigate(
								'AddCard',
								{title}
							)}
					>
						<Text style={styles.btnText}>ADD CARD</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.btn, {marginTop: 20}]}
						onPress={() =>  this.props.navigation.navigate(
								'Quiz',
								{title}
							)}
					>
						<Text style={styles.btnText}>START QUIZ</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: 'space-around',
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
	title: {
		fontSize: 30,
		textAlign: 'center'
	},
	card: {
		textAlign: 'center',
		color: 'rgb(60,60,60)',
		fontSize: 20
	}
})

export default DeckItem;

