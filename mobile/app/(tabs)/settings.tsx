import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { pb } from '@/lib/pb';
import { useQuery } from '@tanstack/react-query';
import {
  Bell,
  Calendar,
  ChevronRight,
  Clock,
  Download,
  FlipHorizontal,
  Info,
  Settings,
  Shield,
  Upload,
  Users,
} from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SwitchRow } from '@/components/SwitchRow';
import Section from '@/components/Section';
import { useAuth } from '@/hooks/auth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function SettingsScreen() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const { user, loading, logout } = useAuth();

  const [notifications, setNotifications] = useState({
    birthday: true,
    weekly: true,
    email: false,
    push: true,
  });

  if (loading) return <Text>Carregando...</Text>;
  if (!user) return <Text>Usuário não encontrado</Text>;

  const avatarUrl = user.avatar ? pb.files.getUrl(user, user.avatar) : undefined;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView>
        <Section icon={Users} title="Conta">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center p-4">
              <Avatar alt="">
                <AvatarImage source={{ uri: avatarUrl }} />
                <AvatarFallback>
                  <Text>{user.name?.[0]}</Text>
                </AvatarFallback>
              </Avatar>

              <View className="ml-4">
                <Text className="text-primary">{user.name}</Text>

                <Text className="text-primary">{user.email}</Text>
              </View>
            </View>

            <Button variant={'ghost'} className="mr-4" size="icon">
              <Settings className="text-primary" size={20} />
            </Button>
          </View>
        </Section>

        <Section icon={Settings} title="Configurações">
          <SwitchRow
            title="Tema"
            description={`Modo ${colorScheme === 'dark' ? 'Escuro' : 'Claro'}`}
            value={colorScheme === 'dark'}
            onChange={(v) => setColorScheme(v ? 'dark' : 'light')}
          />
        </Section>

        <Section icon={Bell} title="Notificações">
          <SwitchRow
            title="Aniversários"
            value={notifications.birthday}
            onChange={(v) => setNotifications((s) => ({ ...s, birthday: v }))}
          />
          <SwitchRow
            title="Semanal"
            value={notifications.weekly}
            onChange={(v) => setNotifications((s) => ({ ...s, weekly: v }))}
          />
        </Section>

        <View className="px-6 py-6">
          <Button onPress={logout}>
            <Text className="text-primary">Logout</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
