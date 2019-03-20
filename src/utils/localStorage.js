const walletKey = '__CQL_WALLET_ADDRESS__'

export const setWalletAddress = (addr) => {
  localStorage.setItem(walletKey, addr)
}

export const getWalletAddress = () => {
  return localStorage.getItem(walletKey)
}
