# ShapeShift
This project combines Svelte for the frontend with PocketBase as a backend database. It provides a minimal setup to get started quickly.

## Steps to Duplicate

First, run the following command to clone the repository.

```bash
git clone https://github.com/pandapog123/Create-A-Programmer-Social-Media-using-SvelteKit-and-PocketBase.git

cd ShapeShift
```

## Dependencies

Once you've set up the svelte project on your computer, install the following dependecies with `npm install`:
```bash
npm install pocketbase highlight.js iconify-icon

npm i --save-dev @types/highlight.js
```

Go to the [PocketBase docs](https://pocketbase.io/docs/) and download the zip file for your specific operating system. If yout have issues with pocketbase download the v0.21.0 version.

Once you have extracted the files, copy the extracted folder into your SvelteKit and rename it to pocketbase (you can replace the current pocketbase folder or just keep the current one).

Open the pocketbase folder that you just created and run ./pocketbase serve. Open the Admin UI link and create a new account

You will also want to create a .env file where you will store your pocketbase email and password in the following format:
```
POCKETBASE_PRIVATE_EMAIL="johndoe@gmail.com"
POCKETBASE_PRIVATE_PASSWORD="Johndoe18"
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```
Then open another terminal and run

```bash
cd pocketbase

./pocketbase serve
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
