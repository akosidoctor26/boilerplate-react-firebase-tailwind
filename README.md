## How to Import Production Data Into the Local Emulator

We’ll do all work in the terminal, so make sure to install the Google Cloud SDK (see how to) and theFirebase CLI (see how to) before we begin.

1. Login to Firebase:

```
firebase login
```

2. See the list of your projects and connect to the one you’d like to export data from:

```
gcloud projects list
gcloud config set project your-project-name
```

3. Export your production data to a Google Cloud Storage bucket, providing a name of your choice:

```
gcloud firestore export gs://your-project-name.appspot.com/your-choosen-folder-name
```

4. Now copy this folder to your local machine. I usually do this directly from my project’s functions folder:

```cd functions
gsutil -m cp -r gs://your-project-name.appspot.com/your-choosen-folder-name .
```

5. Now we just want to import this folder. Technically, this should work with the basic command firebase emulators:start — import ./your-choosen-folder-name, but for right now it will throw an error: Import/Export metadata file does not exist. Skipping data import! See issue ticket and workaround explanation here. So all we need to do is create a file named firebase-export-metadata.json using the following commands:

```
firebase emulators:start --only firestore
firebase emulators:export seed
```

6. Now if you ran the previous command in your functions folder, you will see a folder named seed with a file named firebase-export-metadata.json. Let’s go ahead and modify the fields path and metadata_file name.
   From:

```
{
  "version": "X.X.X",
  "firestore": {
      "version": "X.XX.X",
      "path": "firestore_export",
      "metadata_file":     "firestore_export/firestore_export.overall_export_metadata"
   }
}
```

To:

```
{
  "version": "X.X.X",
  "firestore": {
     "version": "X.XX.X",
     "path": "your-choosen-folder-name",
     "metadata_file": "your-choosen-folder-name.overall_export_metadata"
   }
}
```

7. Move firebase-export-metadata.json to your-choosen-folder-name:

```
cp seed/firebase-export-metadata.json your-choosen-folder-name
```

8. 😅 Finally we can run:

```
firebase emulators:start --import your-choosen-folder-name
```

P.S To learn more about the individual commands the gsutil and gcloud CLI tools provide, you can always run firebase — help .

Full Guide here: https://medium.com/firebase-developers/how-to-import-production-data-from-cloud-firestore-to-the-local-emulator-e82ae1c6ed8

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
