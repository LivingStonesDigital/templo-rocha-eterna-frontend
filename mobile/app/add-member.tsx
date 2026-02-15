import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { membersProcedure } from '@/features/members.procedure';
import { churchProcedure } from '@/features/church.procedures';
import { Member, TypeMember, TypeAceito } from '@/types/membro.type';
import { Church } from '@/types/church.type';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Camera,
  Phone,
  Save,
  User,
  X,
  MapPin,
  Heart,
} from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useViaCep } from '@/hooks/useCep';

// Componente de seção para melhor organização
const Section: React.FC<{
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}> = ({ icon, title, children }) => (
  <View className="mb-6">
    <View className="mb-4 flex-row items-center">
      {icon}
      <Text className="text-lg font-bold text-foreground">{title}</Text>
    </View>
    <View className="gap-4 rounded-lg border border-border bg-card p-4">{children}</View>
  </View>
);

// Componente de campo de formulário
const FormField: React.FC<{
  error?: any;
  children: React.ReactNode;
}> = ({ error, children }) => (
  <View>
    {children}
    {error && <Text className="mt-1 text-sm text-destructive">Este campo é obrigatório</Text>}
  </View>
);

export default function AddMemberScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
 
  const { fetchAddress, loading: cepLoading } = useViaCep();
 
  const [churches, setChurches] = React.useState<Church[] | null>(null);
  const [loadingChurches, setLoadingChurches] = React.useState(true);

  // Cores
  const iconColor = isDark ? '#ffffff' : '#000000';
  const mutedIconColor = isDark ? '#a1a1aa' : '#71717a';
  const primaryColor = '#3b82f6';

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useForm<Member>({
    defaultValues: {
      nome: '',
      sobrenome: '',
      genero: '',
      dataDeNascimento: '',
      email: '',
      cel: '',
      tel: '',
      cep: '',
      endereco: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      rg: '',
      orgExp: '',
      naturalDe: '',
      estadoCivil: '',
      conjugue: '',
      dataDeCasamento: undefined,
      tipo: 'MEMBRO',
      aceitoPor: 'BATISMO',
      dataBatismo: undefined,
      igreja: '',
      igrejaAnterior: '',
      pastor: '',
      cargoExercidos: '',
      desejaExerceFuncaoNaIgreja: false,
      talentos: '',
    },
  });

  // Carregar igrejas ao montar o componente
  React.useEffect(() => {
    const loadChurches = async () => {
      try {
        const data = await churchProcedure.getAll();
        setChurches(data);
      } catch (error) {
        console.error('Erro ao carregar igrejas:', error);
        Alert.alert('Erro', 'Não foi possível carregar a lista de igrejas.');
      } finally {
        setLoadingChurches(false);
      }
    };
    loadChurches();
  }, []);

  // Handler para buscar endereço pelo CEP
  const handleCepBlur = async (cep: string) => {
    const address = await fetchAddress(cep);
    if (address) {
      setValue('endereco', address.endereco);
      setValue('bairro', address.bairro);
      setValue('cidade', address.cidade);
      setValue('estado', address.estado);
    }
  };

  const handleImagePicker = () => {
    Alert.alert('Upload Photo', 'Choose photo source', [
      { text: 'Camera', onPress: () => console.log('Open camera') },
      { text: 'Gallery', onPress: () => console.log('Open gallery') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const onSubmit: SubmitHandler<Member> = async (data) => {
    try {
      console.log('Dados do formulário:', data);
      
      // Converter datas do formato DDMMYYYY para DD/MM/YYYY
      const formatDateForSubmit = (dateStr?: string) => {
        if (!dateStr || dateStr.length !== 8) return undefined;
        return `${dateStr.slice(0, 2)}/${dateStr.slice(2, 4)}/${dateStr.slice(4, 8)}`;
      };

      const memberData = {
        ...data,
        dataDeNascimento: formatDateForSubmit(data.dataDeNascimento),
        dataBatismo: formatDateForSubmit(data.dataBatismo),
      };

      console.log('Dados formatados:', memberData);
      
      await membersProcedure.create(memberData);

      Alert.alert('Sucesso', `Membro ${data.nome} ${data.sobrenome} adicionado com sucesso!`, [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error: any) {
      console.error('Erro ao salvar membro:', error);
      Alert.alert(
        'Erro', 
        `Ocorreu um erro ao salvar o membro: ${error.message || 'Tente novamente.'}`
      );
    }
  };

  const handleCancel = () => {
    Alert.alert('Descartar alterações?', 'Tem certeza que deseja descartar este novo membro?', [
      { text: 'Continuar Editando', style: 'cancel' },
      { text: 'Descartar', style: 'destructive', onPress: () => router.back() },
    ]);
  };

  function formatDate(value: string) {
  if (!value) return '';

  return value
    .replace(/\D/g, '')
    .slice(0, 8)
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
}

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between border-b border-border px-6 py-4">
        <TouchableOpacity onPress={handleCancel} className="flex-row items-center gap-2">
          <ArrowLeft size={24} color={iconColor} />
          <Text className="text-lg text-foreground">Voltar</Text>
        </TouchableOpacity>
        <Text className="text-xl font-bold text-foreground">Novo Membro</Text>
        <TouchableOpacity onPress={handleSubmit(onSubmit)} className="flex-row items-center gap-2">
          <Save size={20} color={primaryColor} />
          <Text className="text-lg font-semibold text-primary">Salvar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 128 }}>
        {/* Profile Photo Section */}
        <View className="items-center py-8">
          <TouchableOpacity onPress={handleImagePicker} className="relative">
            <View className="h-32 w-32 items-center justify-center rounded-full border-2 border-dashed border-border bg-muted">
              <Camera size={32} color={mutedIconColor} />
              <Text className="mt-2 text-xs text-muted-foreground">Adicionar Foto</Text>
            </View>
            <View className="absolute bottom-0 right-0 rounded-full bg-primary p-2">
              <Camera size={16} color="#ffffff" />
            </View>
          </TouchableOpacity>
          <Text className="mt-2 text-sm text-muted-foreground">Toque para carregar foto</Text>
        </View>

        {/* Informações Pessoais */}
        <Section
          icon={<User size={20} color={primaryColor} style={{ marginRight: 8 }} />}
          title="Informações Pessoais">
          <FormField error={errors.nome}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input placeholder="Nome *" onBlur={onBlur} onChangeText={onChange} value={value} />
              )}
              name="nome"
            />
          </FormField>

          <FormField error={errors.sobrenome}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Sobrenome *"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="sobrenome"
            />
          </FormField>

          <FormField error={errors.genero}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Select 
                  onValueChange={(option) => {
                    onChange(option?.value);
                  }} 
                  value={{ value: value, label: value === 'masculino' ? 'Masculino' : 'Feminino' }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o gênero *" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem label="Masculino" value="masculino">
                        Masculino
                      </SelectItem>
                      <SelectItem label="Feminino" value="feminino">
                        Feminino
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
              name="genero"
            />
          </FormField>

          <FormField error={errors.dataDeNascimento}>
            <Controller
              control={control}
              rules={{ required: true }}
              name="dataDeNascimento"
              render={({ field: { onChange, value } }) => {
                const safeValue = value ?? '';

                return (
                  <View className="flex-1">
                      <Label className='text-black/50'>Data de Nascimento</Label>
                    <View className="relative">
                      <Input
                        keyboardType="number-pad"
                        maxLength={8}
                        caretHidden
                        value={safeValue}
                        onChangeText={onChange}
                        className="h-12 bg-transparent"
                      />

                      {/* Overlay */}
                      <View className="absolute border/50 inset-0 z-10 flex-row items-center justify-around rounded-lg">
                        {'DD/MM/YYYY'.split('').map((char, index, arr) => {
                          const delimitersBefore = arr
                            .slice(0, index)
                            .filter((c) => c === '/').length;

                          const valueIndex = index - delimitersBefore;
                          const digit = safeValue[valueIndex];

                          return (
                            <Text key={index} className="flex-1 text-center text-lg">
                              {char === '/' ? (
                                <Text className="text-zinc-800">/</Text>
                              ) : digit ? (
                                digit
                              ) : (
                                <Text className="text-zinc-800">{char}</Text>
                              )}
                            </Text>
                          );
                        })}
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </FormField>

          <FormField error={errors.rg}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input placeholder="RG *" onBlur={onBlur} onChangeText={onChange} value={value} />
              )}
              name="rg"
            />
          </FormField>

          <FormField error={errors.orgExp}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Órgão Expedidor *"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="orgExp"
            />
          </FormField>

          <FormField error={errors.naturalDe}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Natural de *"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="naturalDe"
            />
          </FormField>
        </Section>

        {/* Informações de Contato */}
        <Section
          icon={<Phone size={20} color={primaryColor} style={{ marginRight: 8 }} />}
          title="Informações de Contato">
          <FormField error={errors.email}>
            <Controller
              control={control}
              rules={{ required: true, pattern: /^\S+@\S+$/i }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Email *"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
              name="email"
            />
          </FormField>

          <FormField error={errors.cel}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Celular *"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="phone-pad"
                />
              )}
              name="cel"
            />
          </FormField>

          <FormField error={errors.tel}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Telefone"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="phone-pad"
                />
              )}
              name="tel"
            />
          </FormField>
        </Section>

        {/* Endereço */}
        <Section
          icon={<MapPin size={20} color={primaryColor} style={{ marginRight: 8 }} />}
          title="Endereço">
          <FormField error={errors.cep}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="relative">
                  <Input
                    placeholder="CEP *"
                    onBlur={(e) => {
                      onBlur();
                      handleCepBlur(value);
                    }}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="numeric"
                    maxLength={9}
                  />
                  {cepLoading && (
                    <View className="absolute right-3 top-3">
                      <ActivityIndicator size="small" color={primaryColor} />
                    </View>
                  )}
                </View>
              )}
              name="cep"
            />
          </FormField>

          <FormField error={errors.endereco}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Endereço *"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="endereco"
            />
          </FormField>

          <FormField error={errors.numero}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Número *"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                />
              )}
              name="numero"
            />
          </FormField>

          <FormField error={errors.bairro}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Bairro *"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="bairro"
            />
          </FormField>

          <FormField error={errors.cidade}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Cidade *"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="cidade"
            />
          </FormField>

          <FormField error={errors.estado}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Estado *"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  maxLength={2}
                  autoCapitalize="characters"
                />
              )}
              name="estado"
            />
          </FormField>
        </Section>

        {/* Estado Civil */}
        <Section
          icon={<Heart size={20} color={primaryColor} style={{ marginRight: 8 }} />}
          title="Estado Civil">
          <FormField error={errors.estadoCivil}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Select 
                  onValueChange={(option) => {
                    onChange(option?.value);
                  }}
                  value={value ? {
                    value: value,
                    label: value === 'SOLTEIRO' ? 'Solteiro(a)' :
                           value === 'CASADO' ? 'Casado(a)' :
                           value === 'DIVORCIADO' ? 'Divorciado(a)' : 'Viúvo(a)'
                  } : undefined}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Estado Civil *" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem label="Solteiro(a)" value="SOLTEIRO">
                        Solteiro(a)
                      </SelectItem>
                      <SelectItem label="Casado(a)" value="CASADO">
                        Casado(a)
                      </SelectItem>
                      <SelectItem label="Divorciado(a)" value="DIVORCIADO">
                        Divorciado(a)
                      </SelectItem>
                      <SelectItem label="Viúvo(a)" value="VIUVO">
                        Viúvo(a)
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
              name="estadoCivil"
            />
          </FormField>

          {watch('estadoCivil') === 'CASADO' && (
            <>
              <FormField error={errors.conjugue}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder="Nome do Cônjuge"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="conjugue"
                />
              </FormField>

              <FormField error={errors.dataDeCasamento}>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert('DatePicker', 'Implemente um seletor de data aqui');
                      }}
                      className="flex-row items-center rounded-lg border border-border bg-background px-4 py-3">
                      <Calendar size={20} color={mutedIconColor} style={{ marginRight: 8 }} />
                      <Text className={value ? 'text-foreground' : 'text-muted-foreground'}>
                        {value ? value.toLocaleString() : 'Data de Casamento'}
                      </Text>
                    </TouchableOpacity>
                  )}
                  name="dataDeCasamento"
                />
              </FormField>
            </>
          )}
        </Section>

        {/* Ministério */}
        <Section
          icon={<Briefcase size={20} color={primaryColor} style={{ marginRight: 8 }} />}
          title="Informações Ministeriais">
          <FormField error={errors.tipo}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Select 
                  onValueChange={(option) => {
                    onChange(option?.value);
                  }}
                  value={value ? {
                    value: value,
                    label: value === 'MEMBRO' ? 'Membro' :
                           value === 'CONGREGANTE' ? 'Congregante' : 'Frequentador'
                  } : undefined}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo *" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem label="Membro" value="MEMBRO">
                        Membro
                      </SelectItem>
                      <SelectItem label="Congregante" value="CONGREGANTE">
                        Congregante
                      </SelectItem>
                      <SelectItem label="Frequentador" value="FREQUENTADOR">
                        Frequentador
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
              name="tipo"
            />
          </FormField>

          <FormField error={errors.aceitoPor}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Select 
                  onValueChange={(option) => {
                    onChange(option?.value);
                  }}
                  value={value ? {
                    value: value,
                    label: value === 'BATISMO' ? 'Batismo' :
                           value === 'ADESAO' ? 'Adesão' :
                           value === 'TRANSFERENCIA' ? 'Transferência' : 'Aclamação'
                  } : undefined}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Aceito Por *" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem label="Batismo" value="BATISMO">
                        Batismo
                      </SelectItem>
                      <SelectItem label="Adesão" value="ADESAO">
                        Adesão
                      </SelectItem>
                      <SelectItem label="Transferência" value="TRANSFERENCIA">
                        Transferência
                      </SelectItem>
                      <SelectItem label="Aclamação" value="ACLAMACAO">
                        Aclamação
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
              name="aceitoPor"
            />
          </FormField>

          <FormField error={errors.dataBatismo}>
            <Controller
              control={control}
              rules={{ required: true }}
              name="dataBatismo"
              render={({ field: { onChange, value } }) => {
                const safeValue = value ?? '';

                return (
                  <View className="flex-1">
                      <Label className='text-black/50'>Data de Batismo</Label>
                    <View className="relative">
                      <Input
                        keyboardType="number-pad"
                        maxLength={8}
                        caretHidden
                        value={safeValue}
                        onChangeText={onChange}
                        className="h-12 bg-transparent"
                      />

                      {/* Overlay */}
                      <View className="absolute border/50 inset-0 z-10 flex-row items-center justify-around rounded-lg">
                        {'DD/MM/YYYY'.split('').map((char, index, arr) => {
                          const delimitersBefore = arr
                            .slice(0, index)
                            .filter((c) => c === '/').length;

                          const valueIndex = index - delimitersBefore;
                          const digit = safeValue[valueIndex];

                          return (
                            <Text key={index} className="flex-1 text-center text-lg">
                              {char === '/' ? (
                                <Text className="text-zinc-800">/</Text>
                              ) : digit ? (
                                digit
                              ) : (
                                <Text className="text-zinc-800">{char}</Text>
                              )}
                            </Text>
                          );
                        })}
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </FormField>

          <FormField error={errors.igreja}>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <View className="relative">
                  <Select 
                    onValueChange={(option) => {
                      console.log('Igreja selecionada:', option);
                      onChange(option?.value);
                    }}
                    value={value ? churches.find(c => c.id === value) ? {
                      value: value,
                      label: churches.find(c => c.id === value)?.name || ''
                    } : undefined : undefined}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a Igreja" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {loadingChurches ? (
                          <SelectItem label="Carregando..." value="" disabled>
                            Carregando...
                          </SelectItem>
                        ) : churches.length > 0 ? (
                          churches.map((church) => (
                            <SelectItem key={church.id} label={church.name} value={church.id}>
                              {church.nome}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem label="Nenhuma igreja encontrada" value="" disabled>
                            Nenhuma igreja encontrada
                          </SelectItem>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {loadingChurches && (
                    <View className="absolute right-3 top-3">
                      <ActivityIndicator size="small" color={primaryColor} />
                    </View>
                  )}
                </View>
              )}
              name="igreja"
            />
          </FormField>

          <FormField error={errors.igrejaAnterior}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Igreja Anterior"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="igrejaAnterior"
            />
          </FormField>

          <FormField error={errors.pastor}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input placeholder="Pastor" onBlur={onBlur} onChangeText={onChange} value={value} />
              )}
              name="pastor"
            />
          </FormField>

          <FormField error={errors.cargoExercidos}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Cargos Exercidos"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  multiline
                  numberOfLines={3}
                />
              )}
              name="cargoExercidos"
            />
          </FormField>

          <FormField error={errors.desejaExerceFuncaoNaIgreja}>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <View className="flex-row items-center gap-x-2">
                  <Checkbox onCheckedChange={onChange} checked={value} />
                  <Label>Deseja exercer função na igreja</Label>
                </View>
              )}
              name="desejaExerceFuncaoNaIgreja"
            />
          </FormField>

          <FormField error={errors.talentos}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Talentos"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  multiline
                  numberOfLines={3}
                />
              )}
              name="talentos"
            />
          </FormField>
        </Section>

        {/* Action Buttons */}
        <View className="mb-6 gap-3">
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            className="flex-row items-center justify-center rounded-lg bg-primary py-4">
            <Save size={20} color="#ffffff" style={{ marginRight: 8 }} />
            <Text className="text-lg font-bold text-primary-foreground">Salvar Membro</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleCancel}
            className="flex-row items-center justify-center rounded-lg bg-muted py-4">
            <X size={20} color={mutedIconColor} style={{ marginRight: 8 }} />
            <Text className="text-lg font-semibold text-muted-foreground">Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
