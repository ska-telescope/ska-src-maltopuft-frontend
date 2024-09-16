Repository structure
====================

An outline of the repository structure is given below:

.. code-block:: console

    ska-src-maltopuft-frontend/
    ├─ cypress/
    ├─ docs/
    ├─ public/
    ├─ src/
    │  ├─ __tests__/
    │  ├─ components/
    │  ├─ config/
    │  ├─ features/
    │  ├─ lib/
    │  ├─ pages/
    │  ├─ types/
    ├─ .env
    ├─ package.json
    ├─ tsconfig.json
    ├─ viteconfig.json

.. note::
    The directory structure is subject to change during early prototyping. 

* ``cypress``: Configuration and end-to-end (e2e) test files for the `Cypress <https://www.cypress.io/>`_ framework.
* ``docs``: Developer documentation pages generated with `sphinx <https://www.sphinx-doc.org/en/master/>`_.
* ``src``: Application code.
    * ``__tests__``: Component unit tests (using Cypress).
    * ``components``: Generic components which can be re-used across several other (unrelated) components.
    * ``config``: Global application configuration such as environment variables.
    * ``features``: 
    * ``lib``: Configures external libraries for use in the context of the application.
    * ``pages``: Configures the pages rendered when accessing different application routes.
    * ``types``: Generic interfaces and type definitions used throughout the application.
* ``.env``: Environment variables.
* ``package.json``: ``npm`` packages and configuration.
* ``tsconfig.json``: Typescript configuration.
* ``viteconfig.json``: `Vite <https://vitejs.dev/>`_ configuration.

More complex features in the ``src/features`` package may be further split up into a package structure similar to below:

.. code-block:: console

    features/
    ├─ foo/
    │  ├─ api/
    │  ├─ components/
    │  ├─ styles/
    │  ├─ types/
    ├─ bar/
    │  ├─ ...

* ``api``: API calls used by the feature and, if applicable, `tanstack-query <https://tanstack.com/query/latest/docs/framework/react/overview>`_ wrappers around the API.
* ``components/``: The React components used in the feature.
* ``styles/``: CSS styling used by the feature's components.
* ``types/``: Interface and type definitions for objects used by the feature.
