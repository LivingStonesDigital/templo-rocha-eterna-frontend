import { Bell } from 'lucide-react-native';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { Text } from './ui/text';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useNotifications } from '@/hooks/useNotifications';

export function Notifications() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <TouchableOpacity style={{ position: 'relative' }}>
          <Bell size={24} color="#232222" />

          {unreadCount > 0 && (
            <View
              style={{
                position: 'absolute',
                top: -6,
                right: -6,
                backgroundColor: '#25D366',
                borderRadius: 12,
                minWidth: 20,
                height: 20,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 4,
              }}
            >
              <Text style={{ color: '#fff', fontSize: 11 }}>
                {unreadCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </DropdownMenuTrigger>

      <DropdownMenuContent style={{ width: 280,  padding: 8, }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
           
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Notificações</Text>
          {unreadCount > 0 && (
            <TouchableOpacity onPress={markAllAsRead}>
              <Text style={{ color: '#25D366' }}>
                Marcar todas
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text>Nenhuma notificação</Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => markAsRead(item.id)}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 6,
                backgroundColor: item.read
                  ? '#fff'
                  : '#E9F5EE',
                borderRadius: 6,
                marginBottom: 6,
              }}
            >
              <Text style={{ fontWeight: '600' }}>
                {item.title}
              </Text>
              <Text style={{ fontSize: 13 }}>
                {item.message}
              </Text>
            </TouchableOpacity>
          )}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
