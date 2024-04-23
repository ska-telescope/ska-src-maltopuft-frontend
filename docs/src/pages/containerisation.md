# Containerisation

[Podman](https://podman.io/docs) is the preferred container engine, although [Docker](https://www.docker.com/get-started/) can be used equivilently (as a first port of call, try simply replacing `podman --> docker` in any commands below). The steps below assume that your container engine of choice is configured and running on your machine.

An OCI image for the application can be built with:

```bash
podman build -t ska-src-maltopuft-frontend:latest .
```

The image can be run with:

```bash
podman run -t -p 3000:3000/tcp ska-src-maltopuft-frontend:latest
```

Navigating to one of `http://localhost|127.0.0.1|0.0.0.0:3000` in a web browser should then render the frontend application.
