import { ExploreNFTs, NFTFormState } from '@/types';
import { api } from '.';

export const getStatistics = async () => {
  return (await api.get(`/nfts/stats`)).data;
};

export const trendingNFTs = async (limit: number) => {
  return (await api.get(`/nfts/trending?limit=${limit}`)).data;
};

export const recentCollections = async (limit: number) => {
  return (await api.get(`/nfts/recent?limit=${limit}`)).data;
};

export const liveAuctions = async (limit: number) => {
  return (await api.get(`/nfts/auctions?limit=${limit}`)).data;
};

export const createNFT = async (create: NFTFormState) => {
  return (await api.post('/nfts', create)).data;
};

export const getAccountListings = async () => {
  return (await api.get('/nfts')).data;
};

export const getUserCreations = async (address: string) => {
  return (await api.get(`/nfts/creator/${address}`)).data;
};

export const getCollectionContents = async (contract: string) => {
  return (await api.get(`/nfts/collection/${contract}`)).data;
};

export const getOneNFT = async (
  contract: string,
  tokenId: number,
  address?: string
) => {
  return (await api.post('/nfts/find', { contract, tokenId, address })).data;
};

export const getAccountAssets = async () => {
  return (await api.get(`/nfts/wallet`)).data;
};

export const getUserNFTs = async (address: string) => {
  return (await api.get(`/nfts/user/${address}`)).data;
};

export const likeNFT = async (_id: string, creator: string, like: boolean) => {
  return (await api.post(`/nfts/like`, { _id, creator, like })).data;
};

export const getAccountLikes = async () => {
  return (await api.get(`/nfts/liked`)).data;
};

export const getUserLikes = async (address: string) => {
  return (await api.get(`/nfts/likes/${address}`)).data;
};

export const listNFT = async (
  contract: string,
  tokenId: number,
  pairId: number,
  price: number,
  listed: boolean,
  auction: boolean
) => {
  return (
    await api.post(`/nfts/list`, {
      contract,
      tokenId,
      pairId,
      price,
      listed,
      auction,
    })
  ).data;
};

export const exploreNFTs = async ({
  search,
  category,
  status,
  sortBy,
  type,
  skip = 0,
  limit = 12,
}: ExploreNFTs) => {
  return (
    await api.get('/nfts/explore', {
      params: {
        search,
        category,
        status,
        sortBy,
        type,
        skip: String(skip),
        limit: String(limit),
      },
    })
  ).data;
};
