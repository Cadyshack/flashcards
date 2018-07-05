import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
					<TouchableOpacity style={styles.btn}  >
						<Text style={styles.btnText}>ADD CARD</Text>
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
	btnText: {
		color: 'white',
		fontSize: 22,
		textAlign: 'center'
	},
	title: {
		fontSize: 30,
	},
	card: {
		textAlign: 'center',
		color: 'rgb(60,60,60)'
	}
})

export default DeckItem;

