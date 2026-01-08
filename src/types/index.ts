export type GenericContractsDeclaration = {
  [chainId: number]: {
    [contractName: string]: {
      address: string;
      abi: any[];
    };
  };
};

type ContractType = 'ERC721' | 'ERC1155';

type ChainId = 763373;

type NetworkName = 'Base Sepolia';

export type SortType = 'Trending' | 'Recent' | 'A to Z' | 'Z to A';

export type StatusType = 'Buy Now' | 'Auction';

export type NFTType = 'Image' | 'Video' | 'Audio';

export type NFTCategory = 'Art' | 'Photo' | 'Collectible' | 'Utility' | 'Asset';

export type ExploreNFTs = {
  search?: string;
  sortBy?: 'trending' | 'recent' | 'a-z' | 'z-a';
  status?: 'buy-now' | 'auction';
  type?: 'image' | 'video' | 'audio';
  category?: 'art' | 'photo' | 'collectible' | 'utility' | 'asset';
  skip: number;
  limit: number;
};

export interface IUser {
  _id: string;
  address: string;
  username: string;
  photo: string;
  cover: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  bio: string;
  website: string;
  followers: string[];
  followersCount: number;
  following: string[];
  followingCount: number;
  isFollowing: boolean;
  verified: boolean;
  kyc: boolean;
  locked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type InfoFormState = Pick<
  IUser,
  | 'address'
  | 'username'
  | 'firstName'
  | 'email'
  | 'company'
  | 'bio'
  | 'website'
  | 'photo'
  | 'cover'
>;

export type PhotoFormState = Pick<IUser, 'address' | 'username' | 'photo'>;

export interface Follow {
  address: string;
  creator: string;
  follow: boolean;
}

export interface ICollection {
  _id: string;
  creator: string;
  contract: string;
  contractType: ContractType;
  network: ChainId | NetworkName;
  name: string;
  description: string;
  website?: string;
  category: string;
  photo: string;
  cover: string;
  total: number;
  floor: number;
  volume: number;
}

export interface CollectionFormState {
  creator: string;
  name: string;
  website?: string;
  network: ChainId | NetworkName;
  contract: string;
  contractType: ContractType;
  description: string;
  photo: File | string;
  cover: File | string;
}

export interface INFT {
  _id: string;
  creator: string;
  owner: string;
  contract: string;
  tokenId: number;
  pairId: number;
  network: ChainId | NetworkName;
  name: string;
  description: string;
  metadata: { [key: string]: string };
  nftType: NFTType;
  category: NFTCategory;
  ipfs: string;
  media: string;
  price: number;
  royalties: number;
  auction: boolean;
  listed: boolean;
  totalLikes: number;
  hasLiked: boolean;
  sold: number;
}

export interface OwnedNFT {
  contract: {
    address: string;
    name: string;
    symbol: string;
    totalSupply: string;
    tokenType: string;
    contractDeployer: string;
    deployedBlockNumber: number;
    spamClassifications: string[];
  };
  tokenId: string;
  tokenType: string;
  name: string;
  description: string;
  image: {
    cachedUrl: string;
    thumbnailUrl: string;
    pngUrl: string;
    contentType: string;
    size: number;
    originalUrl: string;
  };
}

export interface NFTFormState {
  creator: string;
  contract: string;
  network: ChainId | NetworkName;
  name: string;
  description: string;
  metadata: { [key: string]: string };
  nftType: NFTType | string;
  category: NFTCategory | string;
  ipfs: string;
  media: string;
  file?: File | null;
  royalties: number;
}
