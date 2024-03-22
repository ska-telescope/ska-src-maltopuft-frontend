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
    │  ├─ assets/
    │  ├─ config/
    │  ├─ lib/
    ├─ .env
    ├─ package.json
    ├─ tsconfig.json
    ├─ viteconfig.json

.. note::
    The directory structure is subject to change during early prototyping. 

* `cypress`: Configuration and end-to-end (e2e) test files for the `Cypress <https://www.cypress.io/>`_ framework.
* `docs`: Developer documentation pages generated with `sphinx <https://www.sphinx-doc.org/en/master/>`_.
* `src`: Application code.
    * `__tests__`: Component unit tests (using Cypress).
    * `assets`: Static files used by the application such as images, fonts, etc.
    * `config`: Global application configuration such as environment variables.
    * `lib`: Configures external libraries for use in the context of the application.
* `.env`: Environment variables.
* `package.json`: `npm` packages and configuration.
* `tsconfig.json`: Typescript configuration.
* `viteconfig.json`: `Vite <https://vitejs.dev/>`_ configuration.