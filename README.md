# E-Learning App Project

### Installation

For localenv development we use Docker Compose `docker-compose up -d`

- `localhost:9000` -> Template Demo
- `localhost:9001` -> Template Docs
- `localhost:3000` -> Frontend App (dev server)
- `localhost:8080` -> Backend API

### Project structure

- `backend` -> Backend App files
- `frontend` -> Frontend App files
- `shared` -> Shared files across backend & frontend
- `eduport` -> Frontend React/Bootstrap Template
- `docker` -> Docker files & configs

### Recommended setup & tools

Use Docker or Podman for localenv development, initialize project with `docker-compose up -d`.

Configure your terminal and set up the following aliases to speed up development:

- `febash: docker-compose exec frontend sh`
- `babash: docker-compose exec backend sh`

This is not strictly necessary, but will allow you to log into the container to freely run commands by just doing `febash`.

Use VSCode along with the DevContainers plugin. It's recommended to work on each project by attaching a DevContainer VSCode instance to an already running container. This will allow us to log in to the container and get all VSCode auto-completion features, in addition to linting and code formatting on save. Note that none of them will be installed on your local machine, but on the DevContainer instance.
