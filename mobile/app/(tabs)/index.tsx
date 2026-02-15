import { Notifications } from '@/components/notifications';
import { membersProcedure } from '@/features/members.procedure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEvent } from 'expo';
import { Link, useFocusEffect, useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import {
  Calendar,
  CalendarClock,
  ChevronRight,
  Gift,
  PlusCircle,
  Users,
} from 'lucide-react-native';
import React, { useCallback } from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Member = {
  id: string;
  name: string;
  birthday: string;
  photo: string;
  daysUntil: number;
};

export default function HomeScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ['members'],
    queryFn: membersProcedure.getAll,
  });

  /* 🔄 Auto refresh when screen regains focus */
  // useFocusEffect(
  //   useCallback(() => {
  //     queryClient.invalidateQueries({
  //       predicate: (query) =>
  //         ['members', 'birthdays', 'notifications'].includes(query.queryKey[0] as string),
  //     });
  //   }, [])
  // );

  /* ⬇️ Pull-to-refresh (animated + multi-query) */
  const onRefresh = async () => {
    await queryClient.invalidateQueries({
      predicate: (query) =>
        ['members', 'birthdays', 'notifications'].includes(query.queryKey[0] as string),
    });
  };

  const videoSource =
    'https://videos.pexels.com/video-files/7592868/7592868-uhd_2732_1318_30fps.mp4';

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  useEvent(player, 'playingChange', { isPlaying: player.playing });

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <View>
          <Text className="text-base text-muted-foreground">Bem vindo</Text>
          <Text className="text-3xl font-bold text-foreground">Templo Rocha Eterna</Text>
        </View>
        <Notifications />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 128 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={onRefresh}
            tintColor="#6366f1"
            colors={['#6366f1']}
            progressBackgroundColor="#fff"
          />
        }>
        {/* Hero */}
        <View className="mb-6 px-6">
          <View className="overflow-hidden rounded-2xl" style={{ height: 210 }}>
            <VideoView
              player={player}
              allowsFullscreen
              allowsPictureInPicture
              style={{ width: '100%', height: '100%' }}
            />
            <View className="absolute inset-0 items-center justify-center bg-black/40">
              <Text className="px-4 text-center text-2xl font-bold text-white">
                Construindo uma comunidade juntos
              </Text>
              <Text className="mt-2 text-center text-white/90">
                Celebrando vidas e fortalecendo laços
              </Text>
            </View>
          </View>
        </View>
        {/* Stats */}
        <View className="mb-6 px-6">
          <View className="flex-row gap-3">
            <View className="flex-1 rounded-xl border border-border bg-card p-4">
              <Users className="text-primary" size={24} />
              <Text className="text-2xl font-bold text-foreground">{data?.length}</Text>
              <Text className="text-xs text-muted-foreground">Total Members</Text>
            </View>

            <View className="flex-1 rounded-xl border border-border bg-card p-4">
              <Calendar size={24} />
              <Text className="text-2xl font-bold text-foreground">{12}</Text>
              <Text className="text-xs text-muted-foreground">This Month</Text>
            </View>
          </View>
        </View>
        {/* Quick Actions */}
        <View className="mb-6 px-6">
          <Text className="mb-3 text-lg font-bold text-foreground">Quick Actions</Text>
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => router.push('/add-member')}
              className="flex-1 items-center justify-center rounded-xl bg-primary p-4">
              <PlusCircle size={28} />
              <Text className="mt-2 text-sm font-semibold dark:text-black ">Novo</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 items-center justify-center rounded-xl bg-primary/50 p-4">
              <Gift color="#fff" size={28} />
              <Text className="mt-2 text-sm font-semibold dark:text-white">Mensagens</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 items-center justify-center rounded-xl bg-primary p-4">
              <CalendarClock size={28} />
              <Text className="mt-2 text-sm font-semibold dark:text-black">Lembretes</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Upcoming Birthdays */}
        <View className="mb-6 px-6">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-lg font-bold text-foreground">Próximos Aniversariantes</Text>
            <Link href="/birthdays" asChild>
              <TouchableOpacity className="flex-row items-center">
                <Text className="mr-1 text-primary">Ver todos</Text>
                <ChevronRight className="text-primary" size={16} />
              </TouchableOpacity>
            </Link>
          </View>

          {[
            {
              id: '1',
              name: 'Sarah Johnson',
              birthday: 'Dec 28',
              photo:
                'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=900&auto=format&fit=crop&q=60',
              daysUntil: 0,
            },
          ].map((member) => (
            <View
              key={member.id}
              className="mb-3 flex-row items-center rounded-xl border border-border bg-card p-4">
              <Image source={{ uri: member.photo }} className="mr-3 h-14 w-14 rounded-full" />
              <View className="flex-1">
                <Text className="font-semibold text-foreground">{member.name}</Text>
                <Text className="text-sm text-muted-foreground">{member.birthday}</Text>
              </View>
              <Text className="text-sm text-muted-foreground">
                {member.daysUntil === 0 ? 'TODAY' : `${member.daysUntil}d`}
              </Text>
            </View>
          ))}
        </View>
        {/* Recent Activity */}
        <View className="mb-6 px-6">
          <Text className="mb-3 text-lg font-bold text-foreground">Atividades Recentes</Text>
          {data?.map((member) => (
            <View key={member.id} className="overflow-hidden rounded-xl border border-border bg-card">
              <View className="border-b border-border p-4">
                <View className="flex-row items-center">
                  <View className="mr-3 h-2 w-2 rounded-full bg-accent" />
                  <View className="flex-1">
                    <Text className="font-medium text-foreground">Novo membro cadastrado</Text>
                    <Text className="text-sm text-muted-foreground">Fulano</Text>
                  </View>
                  <Text className="text-xs text-muted-foreground">5h atrás</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
