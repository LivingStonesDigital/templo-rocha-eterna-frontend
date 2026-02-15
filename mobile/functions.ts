import * as Notifications from 'expo-notifications';
import { Alert, Platform } from 'react-native';

export async function registerForPushNotifications() {
  const { status: existingStatus } =
    await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } =
      await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    Alert.alert('Permissão para notificações negada');
    return;
  }

  // Android precisa de canal
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(
      'default',
      {
        name: 'default',
        importance: Notifications.AndroidImportance.HIGH,
      }
    );
  }
}