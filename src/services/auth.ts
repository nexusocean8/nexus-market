import { api } from '.';

export const createNonce = async (address: string) => {
  return (
    await api.post('/auth/nonce', {
      address,
    })
  ).data;
};

export const verifyLogin = async (address: string, signature: string) => {
  return (
    await api.post('/auth/verify', {
      address,
      signature,
    })
  ).data;
};
