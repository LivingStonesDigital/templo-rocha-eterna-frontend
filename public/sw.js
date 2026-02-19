self.addEventListener('push', function (event) {
  let data = {}

  try {
    data = event.data ? event.data.json() : {}
  } catch (err) {
    data = {
      title: "Nova notificação",
      body: event.data ? event.data.text() : "Você recebeu uma mensagem"
    }
  }

  self.registration.showNotification(data.title || "Notificação", {
    body: data.body || "",
    icon: data.icon || '/icon-192.png',
    badge: '/icon-192.png',
    data: {
      url: data.url || '/'
    }
  })
})