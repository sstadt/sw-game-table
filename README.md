Demo app: https://sw.scottstadt.com

### Setup

#### Install Docker

https://www.docker.com/community-edition

You will need to add the `/data/db` folder to docker's shared folders via Preferences -> File Sharing.

#### Build the container

```bash
cd /path/to/repo
docker-compose build
```

#### Install local modules and generate local.js

```bash
npm install && grunt localjs
```

### Development

Build/start the container.

```bash
docker-compose up -d
```

Be sure to run `grunt localjs` before starting the container, or sails will error out. You may also need to configure the IP of your mongo container in `config/local.js`.

While running the container, forever will reload app.js when api or config changes are made to the application. You may reload the application in the browser manually, though in most cases this is not necessary as the websocket will reconnect itself without a browser refresh.

Asset compilation is separated from the node process in development, so you will need to use grunt to test and compile front end assets.

#### Compile and watch assets

```bash
grunt dev
```

#### Compile assets and run tests

```bash
grunt karma
```

#### Run tests without compiling assets

```bash
grunt test
```

#### Create a new Vue.js component

```bash
grunt component --name=myComponent --parent=parentComponent
```

Components will be created in `assets/js/components`. The parent parameter is optional, and further nests the created component. For example, passing `someCoponent` as the parent parameter will build the component at `assets/js/components/someComponent/`.

#### Dev Resources

A list of the current icons can be access while running the app at http://localhost:1337/dev/icons

There is a wiki - which currently only scratches the surface and needs metric boat loads of love - on github: https://github.com/sstadt/sw-game-table-wiki

#### Registering a new User in the app

In order to complete user registration on the app locally, you will need to set up an app password with a gmail account and plug the credentials into `local.js` so you can send registration emails.

Alternatively, you could browse the user collection by connecting to the mongo container and change the `confirmed` property of the user document you've registered to `true`.
