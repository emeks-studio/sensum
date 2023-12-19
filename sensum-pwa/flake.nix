{
  description = "Flake for sensum-pwa";

  nixConfig = {
    # This sets the flake to use the IOG nix cache (and others).
    # Nix should ask for permission before using it,
    # but remove it here if you do not want it to.
    extra-substituters = [
      "https://cache.iog.io"
      "https://pre-commit-hooks.cachix.org"
      "https://emeks-public.cachix.org"
    ];
    extra-trusted-public-keys = [
      "hydra.iohk.io:f/Ea+s+dFdN+3Y/G+FDgSq+a5NEWhJGzdjvKNGv0/EQ="
      "pre-commit-hooks.cachix.org-1:Pkk3Panw5AW24TOv6kz3PvLhlH8puAsJTBbOPmBo7Rc="
      "emeks-public.cachix.org-1:sz2oZuYq7EsRb5FW6sDtpPU1CWh+6ymOgxFgmrYTKGI="
    ];
    allow-import-from-derivation = "true";
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
              modules="$PWD/node_modules"
              mkdir -p "$modules"
              rm -rf "$modules/rescript"
              ln -s ${rescript} "$modules/rescript"
              rescript build -with-deps
              yarn build
            '';
          }; 
        }
    );
}