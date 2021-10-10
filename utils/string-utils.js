export const compressedAddress = (address) => {
  const len = address.length;
  return `${address.slice(0, 7)}...${address.slice(len - 5, len)}`;
};
