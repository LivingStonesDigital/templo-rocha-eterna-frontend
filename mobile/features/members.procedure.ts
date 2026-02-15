import { pb } from '@/lib/pb';
import { Member } from '@/types/membro.type';

export const membersProcedure = {
  create: async (member: Member) => {
    try {
      console.log('Dados do membro a serem enviados:', member);
      
      // 1️⃣ cria o membro
      const createdMember = await pb.collection('membros').create({
        ...member,
      });

      console.log('Membro criado com sucesso:', createdMember);

      // 2️⃣ cria a notificação
      await pb.collection('notifications').create({
        title: 'Novo membro cadastrado',
        message: `O membro ${member.nome} ${member.sobrenome} foi adicionado.`,
        member_id: createdMember.id,
        read: false,
      });
      
      return createdMember;
    } catch (error) {
      console.error('Erro ao criar membro:', error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await pb.collection('membros').getFullList();
      return response;
    } catch (error) {
      console.error('Erro ao buscar membros:', error);
      throw error;
    }
  },

  getByCity: async (city: string) => {
    try {
      const response = await pb.collection('membros').getFullList({ filter: `igreja="${city}"` });
      return response;
    } catch (error) {
      console.error('Erro ao buscar membros:', error);
      throw error;
    }
  },

  getByBirthdate: async () => {
    const birthdate = new Date().toISOString().split('T')[0];
    try {
      const response = await pb.collection('membros').getFullList({ filter: `dataDeNascimento="${birthdate}"` });
      return response;
    } catch (error) {
      console.error('Erro ao buscar membros:', error);
      throw error;
    }
  },
};
