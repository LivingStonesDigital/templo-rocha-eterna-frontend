import { BASE_URL, BASE_URL_USER, pb } from '@/lib/pb';
import { useMutation, useQuery } from '@tanstack/react-query';

type LoginParams = {
  identity: string;
  password: string;
};

type LoginResponse = {
  token: string;
  record: any;
};

export const authProcedure = {
  async login({ identity: email, password }: LoginParams): Promise<LoginResponse> {
    const response = await fetch(`${BASE_URL_USER}/auth-with-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identity: email,
        password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error?.message || 'Erro ao fazer login');
    }

    return response.json();
  },

  
  logout() {
    pb.authStore.clear();
  },

  isAuthenticated() {
    return pb.authStore.isValid;
  },

  getUser() {
    const { data, isLoading, isError } = useQuery({
      queryKey: ['user'],
      queryFn: async () => {
        const userId = pb.authStore.record?.id;

        if (!userId) {
          return null;
        }
        const user = await fetch(`${BASE_URL_USER}/records/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!user.ok) {
          const error = await user.json();
          throw new Error(error?.message || 'Erro ao fazer login');
        }

        return user.json();
      },
    });

    return {
      data,
      isLoading,
      isError,
    };
  },
};
