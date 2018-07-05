import {
	ADD_DECK,
	ADD_CARD,
	RECEIVE_DECKS
} from '../actions';


function decks ( state = {}, action ) {
	const { deckTitle, decks, card, title } = action
	switch (action.type) {
		case ADD_DECK:
		 return {
			 	...state,
			 	[deckTitle]: {
			 		title: deckTitle,
			 		questions: []
			 	}
			}
		case RECEIVE_DECKS:
			return {
				...state,
				...decks,
			}
		case ADD_CARD:
			return {
				...state,
				[title]: {
					...state[title],
					questions: [
						...state[title].questions,
						...card
					]
				}
			}
		default:
			return state
	}
};

export default decks;