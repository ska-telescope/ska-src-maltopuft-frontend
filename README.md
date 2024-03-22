# ska-src-maltopuft-frontend

MALTOPUFT is a prototype MAchine Learning TOolkit for PUlsars and Fast Transients. This repository will hold all code relating to the MALTOPUFT frontend service. The frontend service will initially provide a GUI to inspect single pulse candidates identified by SKA precursor telescopes and, in the future, the SKA. For more details about MALTOPUFT, please refer to the backend service repository, [ska-src-maltopuft-backend](https://gitlab.com/ska-telescope/src/ska-src-maltopuft-backend/-/blob/main/README.md?ref_type=heads).

The frontend is developed with Javascript, [React](https://react.dev/) and [Typescript](https://www.typescriptlang.org/docs/) with [Vite](https://vitejs.dev/). The only prerequisites are [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installations, and a modern web browser such as [Firefox](https://www.mozilla.org/en-GB/firefox/new/) or [Chrome](https://www.google.co.uk/chrome/).

## Documentation

Documentation is generated with [sphinx](https://www.sphinx-doc.org/en/master/). All configuration and documentation pages are stored in `./docs`. To build the documentation, first ensure that `docs` dependencies are installed and use `make`:

```bash
cd ./docs
python3 -m pip install -r requirements.txt

# Build the docs
make clean && make html
```

The docs are built in `./docs/build` and can be viewed in any modern web browser by opening `./docs/build/html/index.html`. The documentation is configured to auto-generate docs for all functions, classes and class methods in the `./src` package. General documentation pages should be created in `./docs/src/package/*.rst`. These pages should be referenced in `./docs/src/index.rst` to be included in the built docs.
