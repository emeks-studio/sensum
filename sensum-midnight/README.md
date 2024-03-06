# Midnight PoC: The Return Of The Oracle

This is an attempt to recreate sensum original app idea by using Midnight testnet blockchain,
that allows to protect users identities by using zero-knowledge proofs.

## Our Magic nix shell

```bash
nix develop
compactc --version
```

## About [Midnight](https://midnight.network/) 

- [high level arch](https://docs.midnight.network/develop/tutorial/high-level-arch)


### Prerequisites

Resources at https://releases.midnight.network/

- Midnight-Lace Wallet: Use chrome extension! :sad:

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

- [Midnight Compact compiler](https://docs.midnight.network/develop/tutorial/building/prereqs#midnight-compact-compiler)