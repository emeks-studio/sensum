# Midnight PoC: The Return Of The Oracle

This is an attempt to recreate sensum original app idea via Midnight testnet blockchain,
that allow us to protect users identities by using zero-knowledge proofs.

## About [Midnight](https://midnight.network/) 

- [High Level Arch](https://docs.midnight.network/develop/tutorial/high-level-arch)
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

## Bulletin board contract and DApp

This example implements a simple one-item bulletin board.  It allows
users to post a single message at a time, and only the user who posted
the message can take it down and make the board vacant again.

The full description of the bulletin board scenario, as well as a
detailed discussion of the code, can be found in part 3 of the
Midnight developer tutorial.

The `bboard-tutorial` directory contains a version of the bulletin
board DApp with some parts missing.  The tutorial guides you through
the process of filling in the missing pieces.  If you are reading this
in the `bboard-tutorial` directory, **do not expect the code to
compile until after you have completed the tutorial**.

The `bboard` directory contains the solution to the problems posed in
the tutorial.  You can think of it as the answer key to the
`bboard-tutorial` example.  If you are reading this in the `bboard`
directory, then the code should compile without changes, but do not
look at it until after you make an effort to complete the exercises by
following the tutorial.

### Development

#### General build:

```nix develop
yarn install # only the first time!
```
^ If you have any node_modules folder please remove it before running the above command.

#### Contract build:

```nix develop
[./bboard-contract]$ yarn compact

post: Uses around 2^11 out of 2^20 constraints (rounded up to the nearest power of two).
take_down: Uses around 2^11 out of 2^20 constraints (rounded up to the nearest power of two).
public_key: Uses around 2^12 out of 2^20 constraints (rounded up to the nearest power of two).
```
^ You can see the TypeScript API that the Compact compiler generated for the contract in contract/src/managed/bboard/contract/index.d.cts. The DApp will rely on this API to deploy the contract and call the circuits.

On the other hand, witnesses.ts defines the private state (part of the system that is consulted to access private state is called an oracle).

#### DApp build:


```nix develop
[./bboard-cli]$ yarn build
[./bboard-cli]$ yarn docker-pull
[./bboard-cli]$ yarn docker-up
```

Wait till docker's up and then run

```nix develop
[./bboard-cli]$ yarn standalone
```

##### Troubleshooting

I removed the sub dependency and instead run this:
```
$ yarn workspace bboard-cli add bboard-contract@0.1.0
```

After that, I think it properly worked:
```
$ yarn workspaces info

> yarn workspaces v1.22.19
{
  "bboard-cli": {
    "location": "bboard-cli",
    "workspaceDependencies": [
      "bboard-contract"
    ],
    "mismatchedWorkspaceDependencies": []
  },
  "bboard-contract": {
    "location": "bboard-contract",
    "workspaceDependencies": [],
    "mismatchedWorkspaceDependencies": []
  }
}
Done in 0.03s.
```

Also notice there is only one node_modules folder in the root of the project. And:
```
[/sensum/sensum-midnight/node_modules]$ ls -ld bboard-cli
> bboard-cli -> ../bboard-cli

[sensum/sensum-midnight/node_modules]$ ls -ld bboard-contract
> bboard-contract -> ../bboard-contract
```

## TODOs

- [x] Run some examples https://docs.midnight.network/develop/tutorial/building/examples-repo
- [x] Complete project setup (yarn, typescript support, rescript).
- [ ] (opt) See if docker part could be included as part of the shell hook (and/or as part of the Nix "for build" packages).
* [x] Flatten folder structure (remove examples/ folder)
* [x] ~~Start a DApp UI project in an extra folder: `sensum-app`~~
* [x] Start a ~~soft migration~~ copy-paste from sensum-pwa to sensum-app
* 3. Start by displaying config setups?
* 4. Display content (previously written via sensum-cli)
* 5. Provide a way of writing content (via sensum-app)
* 6. (optional) Could we run both, ethereum and midnight?
