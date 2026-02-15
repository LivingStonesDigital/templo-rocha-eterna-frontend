// ThemeProvider.tsx
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';
import { THEME } from '@/lib/theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { colorScheme } = useColorScheme();

  return (
      <View className={`${colorScheme} flex-1 bg-background`}>
        {children}
      </View>
  );
}
