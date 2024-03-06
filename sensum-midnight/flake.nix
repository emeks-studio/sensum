{
  description = "A very basic flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils}:
    flake-utils.lib.eachSystem [ "x86_64-linux" ] (system:
      let
        pkgs = import nixpkgs { inherit system; };
        midnight-compact-compiler = pkgs.stdenv.mkDerivation {
          name = "midnight-compact-compiler";
          src = pkgs.fetchurl {
            url = "https://d3fazakqrumx6p.cloudfront.net/artifacts/compiler/compactc_0.9.2/compactc-linux.zip";
            sha256 = "sha256-2jXlmYdrL/nxVl+em7GxOleiPeU+MTq64fu8HWl6xkE="; # replace with the correct hash
          };
          # Ref. https://unix.stackexchange.com/questions/522822/different-methods-to-run-a-non-nixos-executable-on-nixos
          # + some copilot magic!
          nativeBuildInputs = [ 
            pkgs.unzip 
            pkgs.autoPatchelfHook 
          ];
          buildInputs = [ 
            pkgs.glibc
            pkgs.gcc-unwrapped
            pkgs.util-linux
          ];
          unpackPhase = "true";
          installPhase = ''
            mkdir -p $out
            unzip $src -d $out/compactc-linux/
            chmod +x $out/compactc-linux/compactc $out/compactc-linux/zkir $out/compactc-linux/run-compactc.sh
          '';
          autoPatchelf = true;
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
              midnight-compact-compiler
            ];
            shellHook = ''
              export COMPACT_HOME="${midnight-compact-compiler}/compactc-linux"
              export PATH="$PATH:$COMPACT_HOME"
            '';
          }; 
        }
    );
}
