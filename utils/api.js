import { AsyncStorage } from 'react-native';

const FLASHCARD_STORAGE_KEY = 'ccFlashcard:decks';

export function getDecks () {
	return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
}

export function getDeck(title) {
	return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
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

export function addCardToDeck(title, card) {
	getDeck(title)
	.then((res) => {
		let result = JSON.parse(res);
		let qArray = result[title].questions.concat(card);
		return qArray;
	})
	.then((qArray) => {
		return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
			[title]: {
				questions: qArray
			}
		}))
	})


}

