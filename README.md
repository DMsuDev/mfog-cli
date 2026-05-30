<div align="center">

  <!-- Logo -->
  <picture style="display: block; margin-top: 15px;">
    <source media="(prefers-color-scheme: dark)" srcset="assets/logo/mfog-logo-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="assets/logo/mfog-logo-light.svg">
    <img width="320" src="assets/logo/mfog-logo-light.svg" alt="MFoG Logo" style="margin-bottom: 12px;">
  </picture>

  <!-- Tagline -->
  <h3 style="margin: 10px 0 20px 0; font-weight: 600;">
    Fast offline project generator for modern web apps
  </h3>

  <!-- Badges -->
  <p style="margin: 10px 0 5px 0;">
    <!-- Primary badges -->
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Runtime-Node.js-339933?style=flat&logo=node.js" alt="Runtime - Node.js" /></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-green?style=flat&logo=open-source-initiative&logoColor=white" alt="License MIT" /></a>
    <a href="https://www.npmjs.com/package/@dmsudev/mfog"><img src="https://img.shields.io/npm/v/@dmsudev/mfog?style=flat&logo=npm" alt="Published on NPM" /></a>
  </p>

  <p>
    <!-- Secondary badges -->
    <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white" alt="React" /></a>
    <a href="https://vuejs.org/"><img src="https://img.shields.io/badge/Vue-4FC08D?style=flat&logo=vue.js&logoColor=white" alt="Vue" /></a>
    <a href="https://angular.io/"><img src="https://img.shields.io/badge/Angular-DD0031?style=flat&logo=angular&logoColor=white" alt="Angular" /></a>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white" alt="Next.js" /></a>
  </p>

</div>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [CLI Installation](#cli-installation)
- [Create a project](#create-a-project)
- [Project structure](#project-structure)
- [Development](#development)
- [Frameworks](#frameworks)
- [Roadmap](#roadmap)
- [License](#license)

## Overview

**MFOG** is an offline CLI generator for modern web applications.

It allows you to scaffold projects using prebuilt local templates, without requiring an internet connection or downloading external boilerplates.

This makes project creation easy for environments with limited connectivity or for users who prefer a faster setup process.

<p align="center">
  <img src="assets/app.gif" width="600" alt="MFOG App Preview">
</p>

> [!NOTE]
> This project is inspired by CRAO (Create React App Offline) by Baronsindo.
>
> 🔗Original repository: https://github.com/Baronsindo/create-react-app-offline/tree/master

## CLI Installation

Install MFOG globally via npm:

```sh
npm install -g @dmsudev/mfog
```

Once installed, the `mfog` command will be available in your terminal.

> [!NOTE]
> If you had the deprecated package `modular-framework-offline-generator` previously installed, uninstall it first:
>
> ```bash
> npm uninstall -g modular-framework-offline-generator
> ```

## Create a project

Run the CLI:

```sh
mfog
```

You will be prompted for a project name, and MFOG will generate a new directory with a ready-to-use project structure.

It includes:

- Project scaffold (React / Vue / Angular / Next.js)
- Preconfigured files
- Local dependency setup (fully offline)

## Project structure

After generation, move into your project:

```sh
cd your-project-name
```

## Development

Inside the newly created project, you can run:

```sh
npm run dev
```

This starts the development environment so you can begin working on your application.

If you created a **Vue.js** or **Next.js** project, you need to run the following command:

```sh
npm start
```

## Frameworks

- 🟢 Vue `v3.5.26`
- 🔵 React `v19.2.0`
- 🔴 Angular `v21.1.0`
- ⚫ Next.js `v16.1.1`

## Roadmap

- [x] Offline local templates
- [x] React, Vue, Angular, Next.js support
- [ ] Offline cache system to replace bundled templates and reduce package size

## License

This project is licensed under the **MIT License**.<br>
See the [LICENSE](LICENSE) file for more information.

Thanks for checking out **MFOG**! ❤️<br>
