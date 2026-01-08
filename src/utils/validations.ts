import { warning } from './toast';

export const USDC_BASE_ADDRESS = '0x036CbD53842c5426634e7929541eC2318f3dCF7e';

export const isValidUsername = (username: string): boolean => {
  if (!username) {
    warning('Username cannot be empty.');
    return false;
  }

  if (username.length < 1 || username.length > 15) {
    warning('Usernames must be 1-15 characters.');
    return false;
  }

  const validated = /^[a-zA-Z0-9_-]+$/.test(username);

  if (!validated) {
    warning('Usernames cannot contain special characters.');
    return false;
  }

  return true;
};

export const isValidAddress = (address: string): boolean => {
  if (!address) return false;

  const validated = /^0x[0-9a-fA-F]{40}$/.test(address);

  return validated;
};

export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

export const formatSearchType = (value: string): string => {
  if (!value) return '';

  const trimmed = value.trim().replace(' to ', '-');

  return trimmed.toLowerCase().replace(/\s+/g, '-');
};

// Improved search term sanitizer - emoji-safe
export const sanitizeSearchTerm = (value: string): string => {
  if (!value) return '';

  return value
    .trim()
    .replace(/["\\$]/g, '')
    .replace(/\s+/g, ' ')
    .substring(0, 100); // Use substring for better Unicode handling
};

export const isMobile = (): boolean => {
  return /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    navigator.userAgent.toLowerCase()
  );
};

export const formatNumber = (num: number): string => {
  if (!num) return '0';

  return parseFloat(num.toFixed(3)).toLocaleString();
};
