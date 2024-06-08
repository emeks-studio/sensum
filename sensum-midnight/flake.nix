{
  description = "Midnight developers environment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    rescript-compiler = {
      url = "github:rescript-lang/rescript-compiler?ref=10.1.3";
      flake = false;
    };
  };

  outputs = { self, nixpkgs, flake-utils, rescript-compiler}:
    flake-utils.lib.eachSystem [ "x86_64-linux" ] (system:
      let
        pkgs = import nixpkgs { inherit system; };
        python3 = pkgs.python39;
        nodejs = pkgs.nodejs_18;
        yarn = pkgs.yarn.override { nodejs = nodejs; };
        typescript = pkgs.nodePackages.typescript;
        midnight-compact-compiler = 
          pkgs.callPackage 
            ./midnight-compact-compiler.nix 
            { version="0.10.1"; 
              sha256="d492f7251736a68f838d977a69df9a2b12eb3951b8b0caeacfaa405130aaf6f7";
              inherit (pkgs) stdenv fetchurl autoPatchelfHook unzip glibc gcc-unwrapped util-linux; 
            };
        rescript = pkgs.callPackage ./rescript.nix { 
          inherit nodejs python3 rescript-compiler;
          inherit (pkgs) stdenv ocaml-ng; 
        };
      in
        {
          packages = {
            # nix build .#midnight-compact-compiler
            # ls -l result/compactc-linux/
            midnight-compact-compiler = midnight-compact-compiler;
            rescript = rescript;
          };
          devShell = pkgs.mkShell {
            buildInputs = [
              python3
              nodejs
              yarn
              rescript
              midnight-compact-compiler
              typescript
            ];
            shellHook = ''
              export COMPACT_HOME="${midnight-compact-compiler}/compactc-linux"
              export PATH="$PATH:$COMPACT_HOME"
              yarn install
              ln -s "${rescript}/rescript" "$PWD/node_modules/.bin/rescript"
              ln -s ${rescript} "$PWD/node_modules/rescript"
              export PATH="${rescript}:$PWD/node_modules/.bin:$PATH"
            '';
          }; 
        }
    );
}
