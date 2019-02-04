# react-native-tutorial

This is a react native tutorial demos repo.

## How to upgrade to the latest RN

I think the best way to do this is to create a new RN project that has the same name as your existing project.

Then there are two parts you will have to deal with.
1. `package.json` file related.
2. non-`package.json` file related.

### `Package.json` things

Copy newest dependencies and replace your existing ones and keep others.

Basically these stuff.
```json
  "dependencies": {
    "react": "16.6.3",
    "react-native": "0.58.3"
  },
  "devDependencies": {
    "babel-core": "^7.0.0-bridge.0",
    "babel-jest": "24.0.0",
    "jest": "24.0.0",
    "metro-react-native-babel-preset": "0.51.1",
    "react-test-renderer": "16.6.3"
  },
  "jest": {
    "preset": "react-native"
  }
```

### Non-`package.json` things
If your package is really old that you still have `index.ios.js` / `index.android.js`. You will have to do something to your codes to morden styles, like there might have `App.js` and `app.json` and `index.js`. Generally files like this.

Then copy files like:
* `.buckconfig`
* `.flowconfig`
* `.gitattributes`
* `.gitignore`, **DO REMEMBER** to merge this file, you have to keep you own modification.
* `.watchmanconfig`

### Upgrade iOS

You might going to upgrade swift version. Follow the swift way. I met some problems in swift 4.2. The class method can not be called in OC. As there's a modification in Swift 4.2.

### Upgrade Android

Just open your Android Studio and let the IDE do the upgrade job.

If you used NDK, well downlad a new version which is specified in RN doc.
