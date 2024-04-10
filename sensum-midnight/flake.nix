{
  description = "Midnight developers environment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils}:
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
      in
        {
          packages = {
            # nix build .#midnight-compact-compiler
            # ls -l result/compactc-linux/
            midnight-compact-compiler = midnight-compact-compiler;
          };
          devShell = pkgs.mkShell {
            buildInputs = [
              python3
              nodejs
              yarn
              midnight-compact-compiler
              typescript
            ];
            shellHook = ''
              export COMPACT_HOME="${midnight-compact-compiler}/compactc-linux"
              export PATH="$PATH:$COMPACT_HOME"
            '';
          }; 
        }
    );
}
