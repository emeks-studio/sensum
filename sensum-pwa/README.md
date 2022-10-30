# sensum-pwa

## Setup (with nix):

```
$ niv init  
# ^ only in case sources.nix doesn't exist
$ nix-shell
[nix-shell:~/sensum-pwa]$ yarn install
[nix-shell:~/sensum-pwa]$ yarn run re:build
```

## Development:

In one tab (Run vitejs):

```bash
$ yarn run build
^ only the first time (if dist folder does not exist)
$ yarn run dev
```

In other (Run Rescript):

```bash
$ yarn run re:watch
```
