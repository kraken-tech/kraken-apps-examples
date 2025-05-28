# Kraken example apps

This repository contains example code for Kraken apps. You can use this to start
developing your applications. It guides you through the process of building
and trying out an application locally and installing it in your Kraken.

It starts by creating a full-page application but contains code for trying out
account and device apps as well.

## To run the project locally

- Check you're running a version of Node that matches the version in .nvmrc

- [Enable corepack](https://github.com/nodejs/corepack) by running
  `corepack enable`.

- Set up credentials to be able to fetch Tako from our private npm repo.
  We recommend storing them in an `.npmrc` file in this repo, where it's already
  git-ignored.  
  **Never commit this file or its content!**

- Install local dependencies by running `pnpm i` in the root of the project.

- Start the Vite development front end server with `pnpm dev`

- Start the development API server with `node api/server.js`

You should at this point be able to navigate to http://localhost:5173 and see
the example full-page app.

Locally, this app initialisation function is called in the `index.html` file
in this repo. In Kraken, this is done by the Kraken Apps framework.

If you want to try out account tabs or device apps, edit `src/main.jsx`
(it contains commented-out code for the different types of apps)
and update the `index.html` file to match.

## How Kraken Apps work

### Apps placements, initialisation, and arguments

Your Apps are added to Kraken's Supportsite in different locations, according
to the placement you choose when creating the app.

- **Full-page apps** are added to the Kraken's Supportsite as a new page.
  This is the default type of app created by this example.
- **Account Tab apps** are added to the Kraken's Supportsite as a new tab
  in the account page.
- **Account Device apps** are added to the Kraken's Supportsite as a new tab
  in the device page.

Depending on their placement, Kraken will expect your app bundle to provide
some functions for it to call. These functions should be provided on a 
`krakensupport` object on the `window`, and will be called by Kraken when the
app is loaded - you can see an example of how to define this in `src/main.jsx`.

Depending on the placement of the app, they may receive different arguments on
initialisation.  All apps are passed these arguments:
- `rootID`: the ID of the element on the page where your App should mount 
  itself.
- `appSlug`: the slug of the app. This is the slugified name of the app.
- `basename`: the relative URL path where your app is mounted e.g `/client-app/my-app`
- `APIProxyURL`: the URL of the Kraken API proxy. This is the URL your 
  application will be able to make network requests to.
- `appProxyJwt`: the JWT token that your app can use to authenticate
  itself with the Kraken API proxy, and which will be forwarded to your backend.
- `defaultLanguage`: the language the user is using in Kraken.
- `user`: an object, containing:
  - `id`: the Kraken ID of the user.
  - `email`: the email address of the user in Kraken.
  - `firstName`: the first name of the user.
  - `lastName`: the last name of the user.

On top of that, account apps will also receive `accountNumber`, which is the
number of the account where the App is loaded.

Device apps will receive `deviceID`, which is the ID of the device the user
selected.

## Deploying an example app to your Kraken

### Prerequisites

To test an app to your Kraken, you'll need access to it and sufficient
permissions to configure Kraken Apps.
Your Kraken admins will be able to grant you the correct role for this.

It's generally a good idea to use your test environment to start!

With that done, you should see the Kraken App Store menu item under the 'Admin'
navigation menu. On that page, you should be to see the apps already
installed for your Kraken, as well as the option to create new ones.

Note: the Kraken App Store is not enabled by default in all Krakens. If you get
an error message when trying to access it, please contact your Kraken admins.

### Preparing the example app to be deployed

To get the example app's JS bundle ready to be deployed, build it running
`pnpm build`.
This will create a `dist` folder in the root of the project, which contains
the compiled JS bundle. The process should produce output similar to this:

```bash
vite v6.0.7 building for production...
✓ XXXX modules transformed.
dist/index.html                  XXXX kB │ gzip:   XXXX kB
dist/assets/index-someHash.js  XXXXXX kB │ gzip: XXXXXX kB
```

You're particularly interested in the `dist/assets/index-someHash.js` file.

With the app built, you can serve the JS bundle from your dev server and use
that to see the app in your Kraken.

Create a new Kraken app in your Kraken, and set the `Source url` to
the URL of the JS bundle. Give the app a clearly-test-related name.

For example, if you're running the dev server on
`http://localhost:5173`, and the JS bundle is in `dist/assets/index-abcdefg.js`,
you would set the `Source url` to
`http://localhost:5173/dist/assets/index-abcdefg.js`.

Depending on what type of app you've built (as mentioned above, a full-page
app by default), you should see a button that will take you to the app's page.
Because you're pointing to localhost, it will only work for you.

Note that you will need to rebuild and update the url again to pick up further
changes of the deployed application. Locally, Vite will hot-reload your code.

### How do I try different example apps?

Head over to `src/main.jsx` and uncomment the app you want to try, and amend it
as required.
Repeat the steps to build the app, and the steps to create a new app in your
Kraken, selecting the appropriate app type.

Note that account and device apps will be passed extra arguments when running in
Kraken.

## To update a deployed app in a Kraken

When we merge changes to an example app, we have to update the reference to the
code manually in any Krakens that are using it. This ensures that browsers don't
cache the old version of the app, as it can lead to confusing experiences
for both users and developers supporting those apps.
