# [Vue.js](https://vuejs.org/) + [NestJS](https://nestjs.com/) [Monorepo](https://monorepo.tools/)

![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fmodernweb-pl%2Fvue-nest-monorepo%2Frefs%2Fheads%2Fmaster%2Fapps%2Fweb%2Fpackage.json&query=%24.dependencies.vue&logo=vuedotjs&logoColor=%234FC08D&label=Vue.js&color=%234FC08D)
![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fmodernweb-pl%2Fvue-nest-monorepo%2Frefs%2Fheads%2Fmaster%2Fapps%2Fapi%2Fpackage.json&query=%24.dependencies.%40nestjs%2Fcore&logo=nestjs&logoColor=%23E0234E&label=NestJS&color=%23E0234E)
![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fmodernweb-pl%2Fvue-nest-monorepo%2Frefs%2Fheads%2Fmaster%2Fpackage.json&query=%24.devDependencies.typescript&logo=typescript&logoColor=%233178C6&label=TypeScript&color=%233178C6)
![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fmodernweb-pl%2Fvue-nest-monorepo%2Frefs%2Fheads%2Fmaster%2Fpackage.json&query=%24.engines.node&logo=nodedotjs&logoColor=%235FA04E&label=Node.js&color=%235FA04E)
[![Verify](https://github.com/modernweb-pl/vue-nest-monorepo/actions/workflows/verify.yml/badge.svg?branch=master&event=push)](https://github.com/modernweb-pl/vue-nest-monorepo/actions/workflows/verify.yml)

## Docker support

Repository includes Docker support for building and pushing images to GitHub Packages. Follow the steps below to build and push the Docker images.

### Prerequisites

Ensure you have Docker installed and running on your machine. You will also need to [authenticate to the GitHub Packages](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#authenticating-to-the-container-registry) to push the Docker images.

```bash
echo $GITHUB_TOKEN | docker login ghcr.io -u <your-github-username> --password-stdin
```

Adjust `docker.registry` and `homegae` fields in `package.json` which are used to properly name the images and link them to your GitHub repository in GitHub Packages:

```json
{
  "homepage": "https://github.com/<your-github-username>/<your-repository-name>",
  "docker": {
    "registry": "ghcr.io/<your-github-username>/<your-repository-name>"
  }
}
```

### Building the Docker Images

To build the Docker images locally, you can use the following command:

```bash
pnpm docker:build
```

### Pushing the Docker Images to GitHub Packages

Once the images are built, push them to GitHub Packages using the following command:

```bash
pnpm docker:push
```

### Docker Compose Setup

Repository also includes a `docker-compose.yml` file for easier multi-container setup and orchestration. Use Docker Compose to start the services locally by running:

```bash
docker-compose up
```

This will spin up all defined services and link containers as needed.

### GitHub Actions for Automated Docker Builds and Pushes

A GitHub Actions workflow is already configured in this repository to automatically build and push Docker images to GitHub Packages whenever a new tag is pushed.
