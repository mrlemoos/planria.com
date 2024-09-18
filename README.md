# planria

<p align="center">
  <img width="1000" src="./docs/assets/open-graph/planria.png" alt="planria logo" />
</p>

This is a Software as a Service (SaaS) tool for feature flags.

This is an open-source (licensed under the [Apache 2.0 license](./LICENSE)) because we believe in
transparency towards our customers and that the things meant for developers should be evaluated
and supported by developers.

> Infrastructure. Edge. Feature Flags. Remote Config.
> A/B tests. No fuss. No hassle.

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