==========
Quickstart
==========

The MALTOPUFT frontend only supports Linux (and Mac) OS. Use the instructions below to deploy the MALTOPUFT frontend on Linux or Mac.

Prerequisites
=============

* Node.js
* npm
* Modern web browser

It is strongly recommended to use a Node version manager such as `nvm <https://github.com/nvm-sh/nvm?tab=readme-ov-file>`_:

.. code-block:: bash

    nvm install 21.7.1
    ...
    Now using node v21.7.1 (npm v10.5.0)

    # Confirm node and npm are installed
    node -v && npm -v
    ...
    v21.7.1
    10.5.0

Development
===========

To bring up a development server, run the following commands and navigate to `localhost:3000 <http://localhost:3000>`_ in your web browser:

.. code-block:: bash

    npm install
    npm run dev

Build
=====

The repository can be built by running the following command:

.. code-block:: bash

    npm run build

The static files produced by the build can be served over a web-server. For example, using the ``http.server`` module packaged with python3 installations:

.. code-block:: bash

    # Navigate to the build directory
    cd dist

    # Serve the build
    python3 -m http.server <port>

Navigating to ``http://localhost:<port>`` in your web browser should render the application.
