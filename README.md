# @asymmetrik/ngx-template

[![Build Status][travis-image]][travis-url]

[travis-url]: https://travis-ci.org/Asymmetrik/ngx-template/
[travis-image]: https://travis-ci.org/Asymmetrik/ngx-template.svg

> Template project for an Angular.io (v2+) Component.
> Provides a template project structure, npm script build, and Webpack dev server configuration for packaging an Angular.io component and for running a local demo of that component.


## Table of Contents
- [Install](#install)
- [Usage](#usage)
- [Structure](#structure)
- [Contribute](#contribute)
- [License](#license)


## Install
This package is intended to be a starting point for a new project in a new repository.
As such, installation involves forking the repository, or cloning it and optionally removing the .git directory to get rid of the repository history.

Forking the repository will allow you to maintain a common history with this project.
This will allow you to periodically perform git merges with this repository to pull in patches and improvements. If you want total freedom and are willing to manually merge changes in the future, feel free to delete the git history of your clone.

To get started, ensure that Node is installed.
We recommend using NVM to manage your node versions.
* NVM  (https://github.com/creationix/nvm)
* Node (https://nodejs.org)

Clone the repository and then install the npm packages in the project directory:
```
npm install
```

At this point, you should be ready to build the project.


## Usage
This project uses Node scripts as a build framework.
There are two primary tasks: build and demo, which build distribution artifacts and run the development server respecitvely.

### Building Artifacts for Distribution
To build the distribution bundle run:

```
npm run build
```

The build generates all artifacts necessary for consuming libraries to utilize Angular's Ahead-of-Time compiler.


### Run the Demo for Development
To run the demo, run:

```
npm run demo
```

## Contribute
PRs accepted. If you are part of Asymmetrik, please make contributions on feature branches off of the ```develop``` branch. If you are outside of Asymmetrik, please fork our repo to make contributions.

## License
See LICENSE in repository for details.
