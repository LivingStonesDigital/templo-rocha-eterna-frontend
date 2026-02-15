import { useEffect, useState } from 'react';
import { pb } from '@/lib/pb';

export function useNotifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // 🔹 Carrega notificações existentes
    const loadNotifications = async () => {
      const list = await pb.collection('notifications').getFullList({
        sort: '-created',
        filter: 'read = false',
      });

      setNotifications(list);
      setUnreadCount(list.filter((n) => !n.read).length);
    };

    loadNotifications();

    // 🔹 Realtime notifications
    pb.collection('notifications').subscribe('*', (e) => {
      if (e.action === 'create') {
        setNotifications((prev) => [e.record, ...prev]);
        setUnreadCount((prev) => prev + 1);
      }
    });

    return () => {
      pb.collection('notifications').unsubscribe('*');
    };
  }, []);

  const markAsRead = async (id: string) => {
    await pb.collection('notifications').update(id, { read: true });

    setNotifications((prev) => prev.filter((n) => n.id !== id));

    setUnreadCount((prev) => Math.max(prev - 1, 0));
  };

  const markAllAsRead = async () => {
    const unread = notifications.filter((n) => !n.read);

    await Promise.all(
      unread.map((n) => pb.collection('notifications').update(n.id, { read: true }))
    );

    setNotifications([]);
    setUnreadCount(0);
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  };
}
