
// First time:
// const randomWallet = ethers.Wallet.createRandom();
const privateKey = "emerge invite switch long first silent letter best hundred rough business strike"
let w = ethers.Wallet.fromMnemonic(privateKey)

console.log("mnemonic:", w.mnemonic)
console.log("private key:", w.privateKey)
console.log("address:", w.address)