
### Install dependencies

AWS lambda runs a specific Node version (8.10). You could use [nvm](https://github.com/creationix/nvm) to use specific nodejs version.

```bash
# install the compatible node version
nvm install

# changes terminal session to use the compatible node version
nvm use

# install node modules
npm install
```

### Test, lint, and generate docs

```bash
# changes to compatible node on the terminal session
nvm use
npm test
npm run lint
npm run docs
```

### Developing locally

Locally as dependency on another project is possible using `npm link`

```bash
# from root directory
# this creates a symbolic link from a global folder to the local code
npm link

# from src/project folder
# this links "node_modules/@zenginehq/backend-firebase" in this particular project to the global folder,
# so that "require" calls looking for backend-firebase wind up loading it from your development folder
npm link @zenginehq/backend-firebase
```
