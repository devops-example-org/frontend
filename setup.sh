!##!/usr/bin/env sh
# from repo root (i.e. ~/repos/my-repo)

# Initialize the workspace root
yarn init -2 -w

# Use node_modules for maximum compatibility
echo "nodeLinker: node-modules" >> .yarnrc.yml 

# Add some helpful yarn plugins
yarn plugin import interactive-tools
yarn plugin import typescript
yarn plugin import workspace-tools

# Configure Yarn for NOT zero-installs
cat >> .gitignore <<'endmsg'

# Yarn Not-Zero-Installs
# https://yarnpkg.com/getting-started/qa/#which-files-should-be-gitignored
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions
endmsg

# Pin Volta, if you're using it
# volta pin node@lts npm@latest yarn@latest

# FIXME: use your github account here
cat >> .yarnrc.yml <<'endmsg'
npmScopes:
  devops-example-org:
    npmPublishRegistry: "https://npm.pkg.github.com"
    npmRegistryServer: "https://npm.pkg.github.com"
    npmAlwaysAuth: true
endmsg

echo "@devops-example-org:registry=https://npm.pkg.github.com" >> .npmrc

# Add changesets CLI
yarn add @changesets/cli && yarn changeset init

# Enable Changesets Github Action
mkdir -p .github/workflows

cat > .github/workflows/release.yml <<'endmsg'
# https://github.com/changesets/action#with-publishing
name: Release

on:
  push:
    branches:
      - main

concurrency: ${{ github.workflow }}-${{ github.ref }}

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
          cache: 'yarn'
          registry-url: 'https://npm.pkg.github.com'
          scope: '@heygrady'
      - name: Setup .yarnrc.yml
        run: |
          yarn config set npmScopes.heygrady.npmRegistryServer "https://npm.pkg.github.com"
          yarn config set npmScopes.heygrady.npmAlwaysAuth true
          yarn config set npmScopes.heygrady.npmAuthToken $NPM_AUTH_TOKEN
        env:
          NPM_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - name: Cache node_modules and yarn cache
        uses: actions/cache@v3
        with:
          path: |
            node_modules
            apps/*/node_modules
            packages/*/node_modules
            scripts/*/node_modules
            .yarn/cache
          key: root-node-modules-folder-v1
          restore-keys: |
            root-node-modules-folder-
      - run: yarn install
      # FIXME: run yarn lint and yarn test before releasing
      - name: Create Release Pull Request or Publish to Github Package Registry
        id: changesets
        uses: changesets/action@v1
        with:
          # This expects you to have a script called version which updates the lockfile after calling `changeset version`.
          version: yarn version
          # This expects you to have a script called release which builds your packages and then calls `changeset publish`.
          publish: yarn release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          # https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages#example-workflow
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          YARN_ENABLE_IMMUTABLE_INSTALLS: false
endmsg

# Install Husky
yarn dlx husky-init --yarn2 && yarn install

# Configure husky in your home directory
cat >> ~/.huskyrc <<'endmsg'
# https://typicode.github.io/husky/#/?id=command-not-found

# If installed volta
# export VOLTA_HOME="$HOME/.volta"
# export PATH="$VOLTA_HOME/bin:$PATH"
endmsg

# Add Commitlint CLI and presets
yarn add @commitlint/cli @commitlint/config-conventional @commitlint/config-lerna-scopes

# Add Commitlint config
cat > commitlint.config.js <<'endmsg'
module.exports = {
  extends: ['@commitlint/config-conventional', '@commitlint/config-lerna-scopes'],
}
endmsg

# Add commitlint hook
yarn husky set .husky/commit-msg 'yarn commitlint --edit ${1}' 

# Add Manypkg
yarn add @manypkg/cli

# Fix all packages
yarn manypkg fix

# Add manypkg hook
yarn husky set .husky/manypkg-check 'yarn manypkg check' 

# Add Turborepo
yarn add turbo

# Add Pre-commit Hook
yarn husky set .husky/pre-commit "yarn turbo run --concurrency=1 --filter=[HEAD^1] precommit"

# Ignore Turbo Folder
echo ".turbo" >> .gitignore

# Configure Turborepo
cat > turbo.json <<'endmsg'
{
  "$schema": "https://turborepo.org/schema.json",
  "baseBranch": "origin/main",
  "pipeline": {
    "build": {
      "inputs": ["src/**/*.{cjs,mjs,js,jsx,cts,mts,ts,tsx}", "package.json"],
      "outputs": ["dist/**"],
      "dependsOn": ["^build"]
    },
    "clean": {},
    "coverage": {
      "inputs": ["src/**/*.{cjs,mjs,js,jsx,cts,mts,ts,tsx}", "test/**/*.{cjs,mjs,js,jsx,cts,mts,ts,tsx}", "package.json"],
      "outputs": ["coverage/**"],
      "dependsOn": ["^build"]
    },
    "format": {
      "inputs": ["src/**/*.{cjs,mjs,js,jsx,cts,mts,ts,tsx}", "test/**/*.{cjs,mjs,js,jsx,cts,mts,ts,tsx}", "package.json"],
      "dependsOn": ["^build"]
    },
    "lint": {
      "inputs": ["src/**/*.{cjs,mjs,js,jsx,cts,mts,ts,tsx}", "test/**/*.{cjs,mjs,js,jsx,cts,mts,ts,tsx}", "package.json"],
      "dependsOn": ["^build"]
    },
    "precommit": {
      "inputs": ["src/**/*.{cjs,mjs,js,jsx,cts,mts,ts,tsx}", "test/**/*.{cjs,mjs,js,jsx,cts,mts,ts,tsx}", "package.json"],
      "dependsOn": ["^build"]
    },
    "test": {
      "inputs": ["src/**/*.{cjs,mjs,js,jsx,cts,mts,ts,tsx}", "test/**/*.{cjs,mjs,js,jsx,cts,mts,ts,tsx}", "package.json"],
      "dependsOn": ["^build"]
    }
  }
}
endmsg
