import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function scheduleNotification(event: any) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Upcoming Event!',
            body: `${event.title} is starting soon!`,
            sound: true,
        },
        trigger: {
            date: new Date(event.date.getTime() - 15 * 60000), // 15 minutes before
        },
    });
}

export async function registerForPushNotifications() {
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
        });
    }

    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
} 