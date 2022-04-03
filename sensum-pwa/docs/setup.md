# Setup

## How it was initialized this project?

1. Install [vitejs](https://vitejs.dev/)
```bash 
$ npm create vite@latest sensum-pwa --template react;
$ cd sensum-pwa
$ npm install
```

2. Fix node version via .nvmrc

3. Add vitejs pluggins for react refresh and pwa apps development and manually update vite.config.js:

```bash
$ npm i -E @vitejs/plugin-react-refresh vite-plugin-pwa -D
```

4. Install Rescript and create bsconfig.json file with proper options

```bash
$ npm install -D -E rescript
$ npm install -E @rescript/react
```

5. Install tailwindcss and turn on JIT with purge in tailwind.config.js

```bash
$ npm install -D -E tailwindcss postcss autoprefixer
$ npx tailwindcss init -p
```

Refs.

- https://github.com/imjoshellis/BGQuickstart.com
- https://willcodefor.beer/posts/how-to-add-tailwind-to-a-rescript-project/
- https://vite-plugin-pwa.netlify.app/guide/#setup

TODOs:

- https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen
- https://pwa-workshop.js.org/3-precaching/#preamble-promises-and-async-await