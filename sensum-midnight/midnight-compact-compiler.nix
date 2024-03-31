{
  stdenv
, fetchurl
, autoPatchelfHook
, unzip
, glibc
, gcc-unwrapped
, util-linux
, version   
}:

stdenv.mkDerivation {
  name = "midnight-compact-compiler";
  src = fetchurl {
    url = "https://d3fazakqrumx6p.cloudfront.net/artifacts/compiler/compactc_${version}/compactc-linux.zip";
    sha256 = "sha256-3cwlSHSGxrJ4K9aKlRr9m/ogmasoEouMV58JN252p2A=";
  };
  # Ref. https://unix.stackexchange.com/questions/522822/different-methods-to-run-a-non-nixos-executable-on-nixos
  # + some copilot magic!
  nativeBuildInputs = [ 
    unzip 
    autoPatchelfHook 
  ];
  buildInputs = [ 
    glibc
    gcc-unwrapped
    util-linux
  ];
  unpackPhase = "true";
  installPhase = ''
    mkdir -p $out
    unzip $src -d $out/compactc-linux/
    chmod +x $out/compactc-linux/compactc $out/compactc-linux/zkir $out/compactc-linux/run-compactc.sh
  '';
  autoPatchelf = true;
}