import Pocketbase from 'pocketbase';
import { Platform } from 'react-native';

// Use 10.0.2.2 para emulador Android, ou o IP da sua máquina para dispositivo físico
const getBaseUrl = () => {
  if (__DEV__) {
    // Em desenvolvimento: use o IP da sua máquina na rede local
    // Para emulador Android, 10.0.2.2 aponta para o localhost do host
    // Para dispositivo físico, substitua pelo IP real (ex: 192.168.1.100)
    return Platform.OS === 'android' 
      ? 'http://10.0.2.2:8090' 
      : 'http://localhost:8090';
  }
  // Em produção, use a URL real do seu servidor
  return 'http://SEU_SERVIDOR_PRODUCAO:8090';
};

export const BASE_URL = getBaseUrl();
export const BASE_URL_USER = `${BASE_URL}/api/collections/users`;

export const pb = new Pocketbase(BASE_URL);
