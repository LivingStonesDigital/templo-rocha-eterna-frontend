import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { Bird } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { THEME } from '@/lib/theme';

export function LoadingScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="flex-1 justify-center items-center bg-background">
      <View className="items-center">
        <Bird
          size={80}
          color={isDark ? THEME.dark.primary : THEME.light.primary}
        />
        <Text className="text-2xl font-bold text-foreground mt-4">
          Templo Rocha Eterna
        </Text>
        <ActivityIndicator 
          size="large" 
          color={isDark ? THEME.dark.primary : THEME.light.primary}
          className="mt-6"
        />
      </View>
    </View>
  );
}
