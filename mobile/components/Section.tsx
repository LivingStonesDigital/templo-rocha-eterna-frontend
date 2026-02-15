import React from 'react'
import { View } from 'react-native';
import { Text } from './ui/text';

export default function Section({ icon: Icon, title, children }: { icon?: any; title?: string; children: React.ReactNode }) {
  return (
    <View className="px-6 py-6">
      <View className="mb-4 flex-row items-center">
        <Icon size={20} className="mr-2 text-primary" />
        <Text className="text-lg font-bold text-foreground">{title}</Text>
      </View>
      <View className="overflow-hidden rounded-xl border border-border bg-card">
        {children}
      </View>
    </View>
  );
}