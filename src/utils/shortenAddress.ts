export const shortenAddress = (address: string): string => {
  const prefixChars = 6;
  const suffixChars = 4;

  const prefix = address.substring(0, prefixChars);
  const suffix = address.substring(address.length - suffixChars);

  return `${prefix}…${suffix}`;
};
