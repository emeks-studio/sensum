{
  description = "Flake for sensum-pwa";

  nixConfig = {
    # TODO: Add cache!
    bash-prompt = "\\[\\e[0;37m\\](\\[\\e[0m\\]nix) \\[\\e[0;1;32m\\]elune\\[\\e[0m\\]\\w \\[\\e[0;1m\\]λ \\[\\e[0m\\]";
  };

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs";
    flake-utils.url = "github:numtide/flake-utils";
    rescript-compiler = {
      url = "github:rescript-lang/rescript-compiler?ref=10.1.3";
      flake = false;
    };
  };

  outputs = { self, nixpkgs, flake-utils, rescript-compiler }:
    # TODO: Add linter hooks?
    flake-utils.lib.eachSystem [ "x86_64-linux" ] (system:
      let
        pkgs = import nixpkgs { inherit system; };
        lib = pkgs.lib;
        stdenv = pkgs.stdenv;
        nodejs = pkgs.nodejs-18_x;
        python3 = pkgs.python39;
        ocaml-ng = pkgs.ocaml-ng;
        rescript = pkgs.callPackage ./rescript.nix { 
          inherit stdenv nodejs python3 ocaml-ng rescript-compiler; 
        };
      in
        {
          devShell = pkgs.mkShell {
            buildInputs = [
              nodejs
              rescript
            ];
            shellHook = ''
              yarn install
              ln -s "${rescript}/rescript" "$PWD/node_modules/.bin/rescript"
              ln -s ${rescript} "$PWD/node_modules/rescript"
              export PATH="${rescript}:$PWD/node_modules/.bin:$PATH"
              rescript build -with-deps
              yarn build
            '';
            NIX_LD_LIBRARY_PATH = lib.makeLibraryPath [
              stdenv.cc.cc
            ];
            NIX_LD = lib.fileContents "${stdenv.cc}/nix-support/dynamic-linker";
          }; 
        }
    );
}