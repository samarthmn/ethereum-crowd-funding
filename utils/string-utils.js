export const compressedAddress = (address) => {
  const len = address.length;
  return `${address.slice(0, 5)}...${address.slice(len - 3, len)}`;
};
