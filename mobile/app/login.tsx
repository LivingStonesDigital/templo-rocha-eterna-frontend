import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import EventSource from 'react-native-sse';

import { Bird } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoogleIcon from '@/components/GoogleSvg';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/auth';
import { THEME } from '@/lib/theme';
import { useColorScheme } from 'nativewind';
import Toast from 'react-native-toast-message';

// @ts-ignore
global.EventSource = EventSource;

WebBrowser.maybeCompleteAuthSession();

export default function LoginPage() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const { login, error, savedCredentials, loading } = useAuth();

  const [identity, setIdentity] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  // Preencher campos com credenciais salvas
  useEffect(() => {
    if (savedCredentials) {
      setIdentity(savedCredentials.identity);
      setPassword(savedCredentials.password);
      setRemember(true);
    }
  }, [savedCredentials]);

  async function handleLogin() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSubmitting(true);
    try {
      await login({ identity, password }, remember);
      
      Toast.show({
        type: 'success',
        text1: 'Login realizado!',
        text2: 'Bem-vindo de volta',
      });
      
      // Forçar redirecionamento
      setTimeout(() => {
        router.replace('/(tabs)');
      }, 100);
    } catch (err) {
      console.error(err);
      Toast.show({
        type: 'error',
        text1: 'Erro ao fazer login',
        text2: error || 'Verifique suas credenciais',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-zinc-900">
      <View className="flex-1 p-6">
        <View className="my-9">
          <View className="mb-4 self-center">
            <Bird
              size={100}
              color={colorScheme === 'dark' ? THEME.dark.primary : THEME.light.primary}
            />
          </View>

          <Text className="text-center text-3xl font-bold dark:text-white">
            Templo Rocha Eterna
          </Text>
          <Text className="text-center text-xl dark:text-white">Seja bem-vindo de novo</Text>
        </View>

        <View className="gap-y-4">
          <View>
            <Label>Email</Label>
            <Input
              placeholder="Email"
              value={identity}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={setIdentity}
            />
          </View>

          <View>
            <Label>Senha</Label>
            <Input
              placeholder="Senha"
              value={password}
              secureTextEntry
              onChangeText={setPassword}
            />
          </View>

          {error && <Text className="text-center text-red-500">{error}</Text>}

          <Button size="lg" onPress={handleLogin} disabled={submitting || loading}>
            <Text className="text-white dark:text-zinc-900">
              {submitting ? 'Entrando...' : 'Entrar'}
              {loading && '...'}
            </Text>
          </Button>

          <View className="flex-row items-center gap-2">
            <Checkbox checked={remember} onCheckedChange={setRemember} />
            <Label onPress={() => setRemember((v) => !v)}>Lembrar de mim</Label>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
