================
Containerisation
================

`Podman <https://podman.io/docs>`_ is the preferred container engine, although `Docker <https://www.docker.com/get-started/>`_ can be used equivalently (as a first port of call, try simply replacing `podman --> docker` in any commands below).

The steps below assume that your container engine of choice is configured and running on your machine.

An OCI image for the application can be built with:

.. code-block:: bash

    podman build -t ska-src-maltopuft-frontend:latest .

The image can be run with:

.. code-block:: bash

    podman run -t -p 3000:3000/tcp ska-src-maltopuft-frontend:latest

Navigating to one of the following addresses in a web browser should then render the frontend application.

* `localhost:3000 <http://localhost:3000/>`_
* `127.0.0.1:3000 <http://127.0.0.1:3000/>`_
* `0.0.0.0:3000 <http://0.0.0.0:3000/>`_ (docker-compose deployments only)