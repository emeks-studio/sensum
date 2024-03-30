# Midnight PoC: The Return Of The Oracle

This is an attempt to recreate sensum original app idea via Midnight testnet blockchain,
that allow us to protect users identities by using zero-knowledge proofs.

## About [Midnight](https://midnight.network/) 

- [high level arch](https://docs.midnight.network/develop/tutorial/high-level-arch)
- [Midnight APIs](https://docs.midnight.network/develop/reference/midnight-api/)

### Prerequisites

Resources at https://releases.midnight.network/

- Midnight-Lace Wallet: It is working only as a Chrome extension! :sad:

- Docker (version >= 24.0.5)

```bash
docker search midnightnetwork
```

- Proof server:

Get the latest proof server image:
```bash
docker pull midnightnetwork/proof-server:latest
docker images | grep proof-server
```

Start the proof server:
```bash
docker run -p 6300:6300 midnightnetwork/proof-server -- 'midnight-proof-server --network devnet'
```

^ Optional: https://docs.midnight.network/develop/tutorial/using/proof-server#optionally-for-linux-users-setup-proof-server-as-a-systemd-service

- Node (version 18 lts)

^ Ignore installation if you use Nix Development Shell

- [Midnight Compact compiler](https://docs.midnight.network/develop/tutorial/building/prereqs#midnight-compact-compiler) 

^1. Ignore installation if you use Nix Development Shell

^2. Optional: https://docs.midnight.network/develop/tutorial/building/prereqs#optional-visual-studio-code-vscode-extension-for-compact

## Our Magic Nix Development Shell

```bash
nix develop
compactc --version
```

- Optional (for VSCODE users): Install compact syntax highlighter extension (from VSIX file) 
  Ref. https://releases.midnight.network/#/vscode-extension

## TODOs

- [ ] Run some examples https://docs.midnight.network/develop/tutorial/building/examples-repo
- [ ] Complete project setup (yarn, typescript support, rescript).
- [ ] See if docker part could be included as part of the shell hook (and/or as part of the Nix "for build" packages).