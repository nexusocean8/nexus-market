import axios from 'axios';
import { api } from '.';

export const imageUpload = async (
  upload: FormData,
  onProgress?: (progress: number) => void
) => {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
    ...(onProgress && {
      onUploadProgress: (progressEvent: any) => {
        if (progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress);
        }
      },
    }),
  };

  return (await api.post('/uploads/image', upload, config)).data;
};

export const getPresignedUrl = async (
  filename: string,
  contentType: string
) => {
  return (await api.post(`/uploads/presigned-url`, { filename, contentType }))
    .data;
};

export const uploadToPresignedUrl = async (
  presignedUrl: string,
  file: File,
  onProgress?: (progress: number) => void
) => {
  const config = {
    headers: {
      'Content-Type': file.type,
    },
    ...(onProgress && {
      onUploadProgress: (progressEvent: any) => {
        if (progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress);
        }
      },
    }),
  };

  return (await axios.put(presignedUrl, file, config)).data;
};

export const getIPFSToken = async () => {
  return (await api.get(`/uploads/ipfs-token`)).data;
};

export const pinMediaToIPFS = async (
  formData: FormData,
  token: string,
  onProgress?: (progress: number) => void
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
    ...(onProgress && {
      onUploadProgress: (progressEvent: any) => {
        if (progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress);
        }
      },
    }),
  };

  const { data } = await axios.post(
    'https://api.pinata.cloud/pinning/pinFileToIPFS',
    formData,
    config
  );

  return data.IpfsHash;
};

export const pinJSONToIPFS = async (metadata: object, token: string) => {
  const formData = new FormData();
  const blob = new Blob([JSON.stringify(metadata)], {
    type: 'application/json',
  });
  formData.append('file', blob, `metadata-${Date.now()}.json`);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  const { data } = await axios.post(
    'https://api.pinata.cloud/pinning/pinFileToIPFS',
    formData,
    config
  );

  return data.IpfsHash;
};
