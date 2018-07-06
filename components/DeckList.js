import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight } from 'react-native';
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
		.then(() => this.setState({ready: true}))
		.catch(function(err){
			console.error('There was an error retreiving decks from AsyncStorage:', err)
		})
	}

	renderItem = ({ item }) => {
		return (
			<TouchableHighlight style={styles.item}
				onPress={() => this.props.navigation.navigate(
					'DeckItem',
					{title: item.title, cardNum: item.cardNum}
				)}
			>
				<View>
					<Text style={styles.title}  >{item.title}</Text>
					<Text style={styles.card} >{`${item.cardNum} cards`}</Text>
				</View>
			</TouchableHighlight>
		)
	}
	render(){
		const { ready } = this.state
		if (ready === false) {
      return <AppLoading />
    }

		return (
			<View style={styles.container}>
				<FlatList
					data={this.props.decks}
					renderItem={this.renderItem}
					keyExtractor={(item, index) => item.title}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	item: {
		flex: 1,
		paddingTop: 20,
		paddingBottom: 20,
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomWidth: 1,
	},
	card: {
		textAlign: 'center',
		color: 'rgb(60,60,60)'
	},
	title: {
		fontSize: 30,

	}
})


function mapStateToProps (state) {
	let deckArray;
	if (Object.keys(state).length !== 0 ){
		deckArray = Object.keys(state).map((deck) => {
			let title = state[deck].title
			let cardNum = state[deck].questions.length
			return {title, cardNum}
		})
	} else {
		deckArray = {}
	}
	return {
		decks: deckArray
	}
}
export default connect(mapStateToProps)(DeckList)