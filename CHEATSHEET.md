## Install NVM

https://github.com/nvm-sh/nvm

We will use NVM to downgrade our node environment to 10.15.3. This version is indicated in `package.json`. If we work with a higher level of node, the `node-sass` package might be incompatable.

```
nvm install 12.12.2
node --version
```


## Run the Front-End Repo

The front-end will run at localhost:3000

```
cd algorithm-visualizer
npm install
npm run start
```

## Run the Server Locally

The server will run at localhost:8080

```
cd algorithm-visualizer-server
npm install
npm run watch
```
