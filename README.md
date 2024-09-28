<p align="center">
  <img width="1000" src="./docs/assets/open-graph/planria.png" alt="planria logo" />
</p>

This is a Software as a Service (SaaS) tool for feature flags.

This is an open-source (licensed under the [Apache 2.0 license](./LICENSE)) because we believe in
transparency towards our customers and that the things meant for developers should be evaluated
and supported by developers.

> **Infrastructure. Edge. Feature Flags. Remote Config.**
> **A/B tests. No fuss. No hassle.**

Planria is the complete platform for managing your feature flags, remote config,
and A/B tests. Deploy with confidence and make data-driven decisions.

Planria provides a comprehensive set of tools to help you manage your feature flags,
remote config, and A/B tests with ease.

- **Feature Flags:** Easily manage and deploy feature flags across your application.
- **Remote Config:** Dynamically configure your application without redeploying.
- **A/B Testing:** Run experiments and make data-driven decisions about your application.

Planria was founded in 2024 with the mission to make feature management easy and accessible
for teams of all sizes. Our platform and infrastructure provide a comprehensive set of tools
to help you manage feature flags, remote config, and A/B tests with ease.

## License

```
  Copyright 2024 Planria Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
```

Planria is an under-construction platform for managing your feature flags, remote config, and A/B tests.
Deploy with confidence and make data-driven decisions.

Planria provides a comprehensive set of tools to help you manage your feature flags, remote config,
and A/B tests with ease.

- **Feature Flags:** Easily manage and deploy feature flags across your application.
- **Remote Config:** Dynamically configure your application without redeploying.
- **A/B Testing:** Run experiments and make data-driven decisions about your application.

Planria was founded in 2024 with the mission to make feature management easy and accessible for teams
of all sizes. Our platform and infrastructure are designed to help projects become products.

## Engineering

This section relates to the development, tools, and solution structure and architecture that have been
implemented in the project across the entire monorepo.


### Package manager 📦

As this structure is a monorepo, we've decided to take Yarn into consideration and we've been using 
it to manage our dependencies and internal modules.

>
> **As Yarn maintainers define it on the official website,**
> 
> "[Yarn](https://yarnpkg.com) is a package manager that doubles down as project manager. 
> Whether you work on simple projects or industry monorepos, whether you're an open source developer 
> or an enterprise user, Yarn has your back."
>

### Scripts 🎰

As mentioned above, we're using [Yarn as package manager](https://yarnpkg.com) to control 
the dependencies and dev. dependencies, internal modules, and monorepo scripts. In addition to Yarn, 
we use [Turborepo](https://turbo.build) - a build system with remote cache developed by [Vercel](https://vercel.com).

- **Dependency installation:** Run `yarn install` or `yarn` to install dependencies and dev. dependencies
  for all the internal workspaces and root project defined in the [package.json](./package.json) file.
- **Build process:** Run `yarn run build` to build all the applications and modules that require bundling.
  This process is controlled by Turborepo.

### Structure ⚖️

The file structure is mapped out in 4 main directories:

```
└── planria.com/
  └── apps/
  └── packages/
  └── tools/
  └── vendors/
```

- **apps** is the directory where the final applications are stored.
- **tools** is the directory where the configurations are stored for several development and/or build tools,
  _e.g._, [TailwindCSS](https://tailwindcss.com), [TypeScript](https://typescriptlang.org), [ESLint](https://eslint.org).
- **packages** is the directory where internal modules and/or packages are stored to be used in the apps.
- **vendors** is the directory where modules to be published on the public [npm registry](https://npmjs.com) are stored.


### Testing 🧪

We utilise [Vitest](https://vitest.dev) as the test runner with [Testing Library](https://testing-library.com)
to sandbox the testing documents and scenarios.

- **Unit testing** files must be named after the file they're testing, followed by 
  the `.test.ts?(x)` suffix and extension.
- **Behavioural and component testing** files must be name after the file they're testing, 
  followed by the `.spec.ts?(x)` suffix and extension.
- **End-to-end testing** files must be named after the scenario, followed by the `.e2e.ts?(x)`
  suffix and extension.

## Features 🗳️

As being a software-as-a-service to enhance the developer experience by leveraging edge computing
to deliver feature flags accurately and fast, Planria provides features such as:

- **SDK to manage, modify, and read your feature flags on the fly.**
- **Projects**
  - Add, edit, or delete projects.
  - Invite other users to projects. We don't create organisations and high difficulty permissions, 
  we create projects that can be shared to those who manage and develop them. No fuss, no difficulty.
- **Environments**
  - Add, edit, or remove environments. 
  - By default, we create **Development** and **Production** automatically for you when 
  you create a new project. ([See Spec](./docs/roadmap/2024/Q4/Auto-Create%20Environments.md)).
  - Bulk action to create multiple environments, _e.g._, for SaaS with the need to manage flags for
  multiple countries. ([See Spec](./docs/roadmap/2025/Q1/Bulk%20Action%20for%20Multi%20Country%20Projects.md))
- **Access tokens**
  - Generate and delete access tokens per environment.
  - Auto-create the access tokens for the bulk-action of environments. ([See Spec](./docs/roadmap/2025/Q1/Bulk%20Action%20for%20Multi%20Country%20Projects.md))
- **Feature Flags**
  - Add, edit, or delete feature flags.
  - When a feature flag is created, the user provides a default value that is forwarded to the environments
  if there are no custom values set to a specific environment.
  - Toggle feature flag per environment.
  - **Scheduled Flagging:** Help you not stay up all night to deploy something to production by 
  giving you the option to schedule when your feature flag should be enabled or disabled. ([See Spec](./docs/roadmap/2025/Q1/Scheduled%20Flagging.md))

## Roadmap 🛣️

Our roadmap is always evolving and prioritising what we'll develop in the next weeks and so. 
As we don't use tools such as Jira or Linear and we don't follow any Agile methodologies, 
our roadmap is highly and frequently editable.

We separate our roadmap into quarters and years.

- **2024**
  - **Q4**
    - [Auto-Create Environments](./docs/roadmap/2024/Q4/Auto-Create%20Environments.md)
- **2025**
  - **Q1**
    - [Bulk Action for Multi Country Projects](./docs/roadmap/2025/Q1/Bulk%20Action%20for%20Multi%20Country%20Projects.md)
    - [Scheduled Flagging](./docs/roadmap/2025/Q1/Scheduled%20Flagging.md)