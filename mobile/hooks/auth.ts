import { pb, BASE_URL } from '@/lib/pb';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import EventSource from 'react-native-sse';
import Toast from 'react-native-toast-message';
import { Platform } from 'react-native';

// @ts-ignore
global.EventSource = EventSource;

WebBrowser.maybeCompleteAuthSession();

const STORAGE_KEYS = {
  USER: 'auth:user',
  TOKEN: 'auth:token',
  CREDENTIALS: 'auth:credentials',
};

const GOOGLE_CLIENT_ID = {
  web: '608370108806-nnche78c94hlbjckuk0tv9rvhou23v4b.apps.googleusercontent.com',
  android: '608370108806-nnche78c94hlbjckuk0tv9rvhou23v4b.apps.googleusercontent.com',
  ios: 'SEU_IOS_CLIENT_ID.apps.googleusercontent.com',
};

type Credentials = {
  identity: string;
  password: string;
};

export function useAuth() {

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savedCredentials, setSavedCredentials] = useState<Credentials | null>(null);

  // Carregar usuário ao iniciar
  useEffect(() => {
    (async () => {
      try {
        const [userValue, credentialsValue, tokenValue] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.USER),
          AsyncStorage.getItem(STORAGE_KEYS.CREDENTIALS),
          AsyncStorage.getItem(STORAGE_KEYS.TOKEN),
        ]);

        if (userValue && tokenValue) {
          setUser(JSON.parse(userValue));
          pb.authStore.save(tokenValue, JSON.parse(userValue));
        }

        if (credentialsValue) {
          setSavedCredentials(JSON.parse(credentialsValue));
        }
        
        // Delay mínimo para garantir que a tela de loading seja visível
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (e) {
        console.error('Erro ao carregar auth:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function login({ identity, password }: Credentials, remember = false) {
    setError(null);
    try {
      const auth = await pb.collection('users').authWithPassword(identity, password);
      setUser(auth.record);

      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(auth.record));
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, auth.token);

      if (remember) {
        await AsyncStorage.setItem(
          STORAGE_KEYS.CREDENTIALS,
          JSON.stringify({ identity, password })
        );
      } else {
        await AsyncStorage.removeItem(STORAGE_KEYS.CREDENTIALS);
      }

      
    } catch (err: any) {
      setError(err.message ?? 'Erro ao autenticar');
      throw err;
    }
  }

  async function logout() {
    pb.authStore.clear();
    await AsyncStorage.multiRemove([STORAGE_KEYS.USER, STORAGE_KEYS.TOKEN]);
    setUser(null);
  }

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
    savedCredentials,
  };
}
