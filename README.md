# React Greeting Example

A React-based example application that demonstrates:

* TypeScript
* Embedding non-react 3rd party components (d3.js)
* Error Boundaries (React 16)
* React Strict Mode (React 16.3)
* New Lifecycle Hooks (React 16.3)
* Various build optimizations with webpack

## Start Server (API)

```bash
cd server

yarn install
yarn start
```

Server runs on `http://localhost:7000`

## Start Client (Development)

```bash
cd client

yarn install
yarn start
```

Open Client in Browser: `http://localhost:8080`

## Build Client (production)

Included are several possible webpack configs for several improvements.

You can build them all at once:

```bash
cd client

yarn install
yarn dist
```

Results are in `public/dist-XXX` folders.

You can run the production build:

```bash
yarn demo
```

# Build Client (Docker Image with nginx)

Aftewards you build the client as described above, you can create an nginx-based Docker image by running:

```bash
# from within 'client' folder:

docker build -t greeting_app -f docker/Dockerfile .
```

Then start the docker image (nginx will listen on port 9000):

```bash
docker run --name GREETING_APP -p 9000:9000 -d greeting_app
```

(or you can run `create-docker.sh` from the client folder)

Then you can access the client on `http://localhost:9000`

