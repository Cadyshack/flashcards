import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AddCard from './AddCard';
import Quiz from './Quiz';
import { connect } from 'react-redux';
import { HeaderBackButton } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';


class DeckItem extends Component {

	static navigationOptions = ({ navigation }) => {
		const { title } = navigation.state.params;
		return {
			title,
			tintColor: '#fff',
			headerLeft: <Ionicons name='ios-arrow-back' style={styles.backButton} size={36} onPress={() => navigation.navigate('Decks')}
			/>
		}
	}

	render(){
		const {title} = this.props.navigation.state.params;
		const cardNumber = this.props.cardNumber;

		return (
			<View style={styles.container}>
				<View>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.card} >{`${cardNumber} cards`}</Text>
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
						onPress={() =>  {
							if (cardNumber > 0 ){
								this.props.navigation.navigate(
									'Quiz',
									{title}
								)
							} else {
								Alert.alert(
									'No Cards!',
									'Please add at least one card before starting a quiz.'
								);
							}
						}}
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
	},
	backButton: {
		color: '#fff',
		overflow: 'hidden',
		marginLeft: 9,
		marginRight: 6,
		marginVertical: 10,
		lineHeight: 30,
		transform: [{scaleX: 1}],

	}
})
function mapStateToProps (state, ownProps) {
	const { title } = ownProps.navigation.state.params;
	return {
		cardNumber: state[title].questions.length
	}
}


export default connect(mapStateToProps)(DeckItem);















