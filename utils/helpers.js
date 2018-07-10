import { Notifications, Permissions } from 'expo';
import { AsyncStorage } from 'react-native';

const NOTIFICATION_KEY = 'ccFlashcard:notifications';

function createNotification() {
	return {
		title: "You haven't studied yet today!",
		body: "Don't forget to take a quiz to keep your knowledge fresh.",
		ios: {
			sound: true,
		}
	}
}

export function setLocalNotification() {
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then((data) => {
			if (data === null){
				Permissions.askAsync(Permissions.NOTIFICATIONS)
					.then(({ status }) => {
						if (status === 'granted')	{
							Notifications.cancelAllScheduledNotificationsAsync();
							let tomorrow = new Date();
							tomorrow.setDate(tomorrow.getDate() + 1);
							tomorrow.setHours(17);
	            tomorrow.setMinutes(0);

	            Notifications.scheduleLocalNotificationAsync(
	            	createNotification(),
	            	{
	            		time: tomorrow,
	            		repeat: 'day'
	            	}
	            )
	            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
	          }
					})
			}
		})
}

export function clearLocalNotification() {
	return AsyncStorage.removeItem(NOTIFICATION_KEY)
		.then(Notifications.cancelAllScheduledNotificationsAsync)
}

// Function to randomly shuffle array taken from
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffleArray(array){
	 for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}