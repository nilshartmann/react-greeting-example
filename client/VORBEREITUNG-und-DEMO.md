# Vorbereitung

## Im `server` Verzeichnis

```bash
cd /Users/nils/develop/javascript/react-greeting-example-16.3/server
yarn start
```

## Im `client` Verzeichnis

* Für TypeScript Debugging Demo:

```
cd /Users/nils/develop/javascript/react-greeting-example-16.3/client
yarn start
```

* Für Code Splitting Demo:

```
cd /Users/nils/develop/javascript/react-greeting-example-16.3/client
yarn demo
```

* Für Caching Demo:

```
cd /Users/nils/develop/javascript/react-greeting-example-16.3/client
./run-docker.sh
```

# Demo

* Chrome Cache löschen:

```
rm /Users/nils/Library/Caches/Google/Chrome/Default/Cache/*
```

* TypeScript: `http://localhost:8080` (einmal Votecomposer aufmachen, damit der nachgeladen wird und im Source View gefunden wird)
* Code Splitting: `http://localhost:8000`

* Hash mit Caching: `http://localhost:9000`

# TOOO

* ggf eigener Workspace für TypeScript Demo ohne Code Splitting?
* dieser eigene Workspace für IDEA inklusive Debugging in IDEA?
