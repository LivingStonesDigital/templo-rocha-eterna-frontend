'use client'

import { usePushNotifications } from '@/hooks/usePushNotifications'

export function EnableNotificationsButton() {
  const { permission, requestPermission } = usePushNotifications()

  if (permission === 'granted') return null

  return (
    <button
      onClick={requestPermission}
      className="bg-green-500 text-white px-4 py-2 rounded-xl"
    >
      🔔 Ativar notificações
    </button>
  )
}
