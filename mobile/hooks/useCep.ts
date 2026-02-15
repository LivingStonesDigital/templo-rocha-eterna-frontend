import { useState } from 'react';

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

export interface AddressData {
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export const useViaCep = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAddress = async (cep: string): Promise<AddressData | null> => {
    // Remove caracteres não numéricos
    const cleanCep = cep.replace(/\D/g, '');

    // Valida o CEP
    if (cleanCep.length !== 8) {
      setError('CEP deve ter 8 dígitos');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      
      if (!response.ok) {
        throw new Error('Erro ao consultar CEP');
      }

      const data: ViaCepResponse = await response.json();

      if (data.erro) {
        setError('CEP não encontrado');
        return null;
      }

      return {
        endereco: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        estado: data.uf || '',
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar CEP';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return { 
    fetchAddress, 
    loading, 
    error, 
    clearError 
  };
};
