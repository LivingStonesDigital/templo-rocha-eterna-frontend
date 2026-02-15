import { useEffect } from 'react';
import { pb } from '@/lib/pb';

export function useMembersRealtime() {
  useEffect(() => {
    pb.collection('members').subscribe('*', async (e) => {
      if (e.action === 'create') {
        await pb.collection('notifications').create({
          title: 'Novo membro',
          message: `👋 ${e.record.name} entrou na plataforma`,
          read: false,
        });
      }
    });

    return () => {
      pb.collection('members').unsubscribe('*');
    };
  }, []);
}
