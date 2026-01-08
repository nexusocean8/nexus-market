import { Follow, IUser } from '@/types';
import { api } from '.';

export const getAccount = async () => {
  return (await api.get('/users')).data;
};

export const updateUser = async (user: Partial<IUser>) => {
  return (await api.post('/users', user)).data;
};

export const getProfile = async (creator: string, address?: string) => {
  return (await api.post(`/users/find`, { creator, address })).data;
};

export const followAccount = async (account: Follow) => {
  return (await api.post('/users/follows', account)).data;
};
