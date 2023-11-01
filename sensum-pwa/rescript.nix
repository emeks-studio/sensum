{ stdenv
, python3
, nodejs
, ocaml-ng
, rescript-compiler
}:

stdenv.mkDerivation {
  name = "rescript";
  version = rescript-compiler.shortRev;
  src = rescript-compiler;
  BS_RELEASE_BUILD = "true";
  buildInputs = [ nodejs python3 ];
  patchPhase = ''
    sed -i 's:./configure.py --bootstrap:python3 ./configure.py --bootstrap:' ./scripts/install.js
    mkdir -p native/4.14.1/bin/
    ln -s ${ocaml-ng.ocamlPackages_4_14.ocaml}/bin/ocamlopt.opt native/4.14.1/bin/ocamlopt.opt
  '';
  dontConfigure = true;
  buildPhase = ''
    # release build https://github.com/BuckleScript/bucklescript/issues/4091#issuecomment-574514891
    node scripts/install.js
  '';
  installPhase = ''
    cp -rf . $out
  '';
}