'use client'

import { useEffect, useState } from 'react'

export function usePushNotifications() {
  const [permission, setPermission] = useState<NotificationPermission | null>(null)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission)
    }
  }, [])

  const requestPermission = async () => {
    if (!('Notification' in window)) return

    const result = await Notification.requestPermission()
    setPermission(result)

    if (result === 'granted') {
      await registerServiceWorker()
    }
  }

  const registerServiceWorker = async () => {
    if (!('serviceWorker' in navigator)) return

    const registration = await navigator.serviceWorker.register('/sw.js')

    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      )
    })

    setSubscription(sub)

    // 👉 Enviar subscription para seu backend
    await fetch('/api/push/subscribe', {
      method: 'POST',
      body: JSON.stringify(sub),
      headers: { 'Content-Type': 'application/json' }
    })
  }

  return {
    permission,
    subscription,
    requestPermission
  }
}

// Helper
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)))
}
