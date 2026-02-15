import { Input } from '@/components/ui/input';
import { membersProcedure } from '@/features/members.procedure';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Calendar, Filter, Mail, Phone, Search, UserPlus } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MembersScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMinistry, setSelectedMinistry] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const response = await membersProcedure.getAll();
      return response;
    },
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!data) return <Text>Não há membros cadastrados</Text>;

  const iconColor = isDark ? '#a1a1aa' : '#71717a';

  // Filter members based on search and ministry
  const filteredMembers = data.filter((member) => {
    const matchesSearch =
      member.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMinistry = selectedMinistry === 'All' || member.ministry === selectedMinistry;
    return matchesSearch && matchesMinistry;
  });

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 py-4">
        <View className="mb-4 flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-foreground">Members</Text>
            <Text className="mt-1 text-muted-foreground">
              {filteredMembers.length} of {data.length} members
            </Text>
          </View>
          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              onPress={() => router.push('/add-member')}
              className="flex-row items-center gap-2 rounded-full bg-primary px-6 py-4">
              <UserPlus color="#ffffff" size={20} />
              <Text className="font-semibold text-primary-foreground">Add</Text>
            </TouchableOpacity>
            {/* <ThemeToggle /> */}
          </View>
        </View>

        {/* Search Bar */}
        <View className="mb-3 flex-row items-center rounded-2xl border border-border bg-card px-4 py-3">
          <Search size={20} color={iconColor} style={{ marginRight: 12 }} />

          <Input
            value={searchQuery}
            onChangeText={setSearchQuery}
            keyboardType="email-address"
            textContentType="emailAddress"
            autoComplete="email"
            placeholder="Email"
            className="ml-2 flex-1 border-0 bg-transparent p-0 text-foreground"
          />

          <TouchableOpacity onPress={() => setShowFilters(!showFilters)} className="ml-3">
            <Filter size={20} color={showFilters ? '#3b82f6' : iconColor} />
          </TouchableOpacity>
        </View>

        {/* Ministry Filter Pills */}
        {/* {showFilters && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, paddingBottom: 8 }}>
            {MINISTRIES.map((ministry) => (
              <TouchableOpacity
                key={ministry}
                onPress={() => setSelectedMinistry(ministry)}
                className={`rounded-full px-4 py-2 ${
                  selectedMinistry === ministry ? 'bg-primary' : 'bg-secondary'
                }`}>
                <Text
                  className={`font-medium ${
                    selectedMinistry === ministry
                      ? 'text-primary-foreground'
                      : 'text-secondary-foreground'
                  }`}>
                  {ministry}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )} */}
      </View>

      {/* Members List */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 128,
          gap: 12,
        }}>
        {filteredMembers.length === 0 ? (
          <View className="items-center py-12">
            <Search size={48} color={iconColor} style={{ marginBottom: 16 }} />
            <Text className="text-center text-xl font-bold text-foreground">No Members Found</Text>
            <Text className="mt-2 text-center text-muted-foreground">
              Try adjusting your search or filters
            </Text>
          </View>
        ) : (
          filteredMembers.map((member) => (
            <TouchableOpacity
              key={member.id}
              onPress={() => router.push('/member-detail')}
              className="overflow-hidden rounded-2xl border border-border bg-card">
              <View className="p-4">
                {/* Member Header */}
                <View className="mb-3 flex-row items-center">
                  <View className='flex items-center justify-center relative'>
                    <Image
                      source={{ uri: `https://avatar.vercel.sh/${member.id}` }}
                      className="h-16 w-16 rounded-full bg-muted"
                    />
                    <Text className="text-white absolute text-2xl font-bold capitalize">{member.nome.charAt(0)}</Text>
                  </View>

                  {/* <View className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                  </View> */}
                  <View className="ml-4 flex-1">
                    <Text className="text-lg font-bold text-foreground">{member.nome}</Text>
                    <View className="mt-1 flex-row items-center gap-2">
                      <View className="rounded-full bg-primary/10 px-2 py-1">
                        <Text className="text-xs font-medium text-primary">{member.tipo}</Text>
                      </View>
                      <View className="rounded-full bg-secondary px-2 py-1">
                        <Text className="text-xs font-medium text-secondary-foreground">
                          {member.aceitoPor}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Member Details */}
                <View className="gap-2 border-t border-border pt-3">
                  <View className="flex-row items-center">
                    <Calendar size={16} color={iconColor} style={{ marginRight: 12 }} />
                    <Text className="flex-1 text-foreground">{member.dataDeNascimento}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Phone size={16} color={iconColor} style={{ marginRight: 12 }} />
                    <Text className="flex-1 text-foreground">{member.cel}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Mail size={16} color={iconColor} style={{ marginRight: 12 }} />
                    <Text className="flex-1 text-foreground">{member.email}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
