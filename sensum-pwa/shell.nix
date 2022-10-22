let
  sources = import ./nix/sources.nix { };
  pkgs = import sources.nixpkgs { };
  NPM_CONFIG_PREFIX = toString ./npm_config_prefix;
in
pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs-14_x
    pkgs.yarn
    pkgs.yarn2nix
    pkgs.python3        # Required by Rescript givent it used of Ninja build system
  ];
  inherit NPM_CONFIG_PREFIX;

  shellHook = ''
    export PATH="${NPM_CONFIG_PREFIX}/bin:$PATH"
  '';
}