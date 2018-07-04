import { AsyncStorage } from 'react-native';

const FLASHCARD_STORAGE_KEY = 'ccFlashcard:decks';

export function getDecks () {
	return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
}

export function getDeck() {

}

export function saveDeckTitle(title) {
	let obj = {
		title,
		questions: []
	}
	return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
		[title]: obj
	}))

}

export function addCardToDeck() {

}

