import { ThemeProvider } from '@/components/ThemeProvider';
import '@/global.css';
import { PortalHost } from '@rn-primitives/portal';
import { Stack, useRouter, useSegments } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useAppState } from '@/hooks/useAppState';
import { useOnlineManager } from '@/hooks/useOnlineManager';
import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query';
import * as React from 'react';
import { AppStateStatus, Platform } from 'react-native';
import { useAuth } from '@/hooks/auth';
import { LoadingScreen } from '@/components/LoadingScreen';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

function RootLayoutNav() {
  const { isAuthenticated, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(tabs)';
    const inLoginScreen = segments[0] === 'login' || segments.length === 0;

    console.log('Nav Check:', { isAuthenticated, segments, inAuthGroup, inLoginScreen });

    if (!isAuthenticated && inAuthGroup) {
      // Usuário não autenticado tentando acessar tabs
      console.log('➡️ Redirecionando para login');
      router.replace('/login');
    } else if (isAuthenticated && (inLoginScreen || segments.length === 0)) {
      // Usuário autenticado na tela de login ou sem rota definida
      console.log('➡️ Redirecionando para tabs');
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, segments, loading]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack 
      screenOptions={{ headerShown: false }}
      initialRouteName={isAuthenticated ? '(tabs)' : 'login'}
    >
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="add-member" options={{ headerShown: false }} />
      <Stack.Screen name="member-detail" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  useAppState(onAppStateChange);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RootLayoutNav />
        <PortalHost />
        <Toast />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
