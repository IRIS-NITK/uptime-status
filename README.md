# Uptime Status Page for IRIS Services

## Setting up the project

### Install node

Recommended method is to use `nvm` (Node Version Manager) to install and manage different versions of node in your system. 

- Follow the steps in [NVM Installation](https://github.com/nvm-sh/nvm/blob/master/README.md#installing-and-updating) and instal `nvm`

- Once `nvm` is installed, install node using 
```
nvm install node
```
> Note: this will install latest version of node, npm on your system

### Installing dependencies and running local development server

- Use this command inside the cloned project to install packages required for the project
```
npm install
```
- Add API base url and service ids to .env.development
- Use `gatsby develop` to run a local development server (by default: localhost:3000) for the web application.

## Publishing the static website to GitHub Pages
- Add API base url and service ids to .env.production
- Use 'npm run deploy' to publish to `gh-pages` branch



