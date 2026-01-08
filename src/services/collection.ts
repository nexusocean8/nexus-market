import { CollectionFormState } from '@/types';
import { api } from '.';

export const createCollection = async (create: CollectionFormState) => {
  return (await api.post('/collections', create)).data;
};

export const updateCollection = async (
  update: Partial<CollectionFormState>
) => {
  return (await api.post('/collections/update', update)).data;
};

export const getAccountCollections = async () => {
  return (await api.get('/collections')).data;
};

export const getUserCollections = async (address: string) => {
  return (await api.get(`/collections/creator/${address}`)).data;
};

export const findCollection = async (contract: string) => {
  return (await api.get(`collections/find/${contract}`)).data;
};
