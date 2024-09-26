# planria-sdk/node

`@planria-sdk/node` is also the base module that handles the CLI (command-line interface)
for the primordial commands necessary for Planria to deploy your feature flags like a charm
and make your competition doubt their own minds just like me when I think about my lady 
friend at night and cry myself to sleep.

## Installation

**Using [pnpm](https://pnpm.io)**

```sh
pnpm add @planria-sdk/node # or pnpm i @planria-sdk/node or pnpm install @planria-sdk/node
```

**Using [yarn](https://yarnpkg.com)**

```sh
yarn add @planria-sdk/node
```

**Using [npm](https://npmjs.com)**

```sh
npm install @planria-sdk/node # or npm i @planria-sdk/node
```

## Development

Under the hood we use [yargs](https://yargs.js.org/) to create our command line programme,
binding the transpiled `dist/cli.js` file to the `bin` inside the [package.json](./package.json).
That means that when you run `planria` in your terminal or whatnot, we arbitrarily inform NodeJS
or whatever runtime you're using that **planria** is the command we've created.

We use [tsup](https://github.com/egoist/tsup) to transpile the TypeScript into plain JavaScript
that allows the end user to run it. It's the way we also must publish the public packages.

**TL;DR:** We use **yargs** to create the interface and interactions via the terminal command,
we write this command line app in TypeScript and use **tsup** to build it into a publishable
JavaScript bundle.

## License

See [LICENSE](../../LICENSE) at the workspace root. Planria Inc. is an open source project licensed
under the Apache 2.0 License.
