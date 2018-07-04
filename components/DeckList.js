import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getDecks } from '../utils/api.js';
import { receiveDecks } from '../actions';
import { connect } from 'react-redux';
import { AppLoading} from 'expo';

class DeckList extends Component {
	state = {
		ready: false,
	}
	componentDidMount () {
		const { dispatch } = this.props
		getDecks()
		.then(function(res){
			return JSON.parse(res)
		})
		.then(function(decks){
			dispatch(receiveDecks(decks))
		})
		.catch(function(err){
			console.error('There was an error retreiving decks from AsyncStorage:', err)
		})

	}

	render(){
		const { ready } = this.state

		return (
			<View style={styles.container}>
				<Text style={styles.title}>This is DeckList.js</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,

	},
	title: {
		textAlign: 'center',

	}
})


function mapStateToProps (decks) {
	return {
		decks
	}
}
export default connect(mapStateToProps)(DeckList);