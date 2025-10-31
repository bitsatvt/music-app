# music-app
A music learning platform that uses quiz games and audio tools to make music education more accessible and engaging.

# How to use this app
- Create a virtual environment
1. Run `python3 -m venv .venv`
2. If error, run `apt install python3.12-venv`
3. Run `sudo apt-get update`
4. Run `sudo apt install python3.12-venv`
5. Run `. .venv/bin/activate` to activate the virtual environment

- Downloading packages
1. Run `pip install flask` in the terminal 

- Running the app
1. Run `python app/app.py` in the terminal
# Music Learning App
A webapp that allows users to track and improve their music skills with interactive lessons, quizzes, and games to make music literacy more accessible and engaging for all.

# For Developers

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Tech Stack](#tech-stack)

## Installation

### 1. WSL Setup
TODO: WSL & Github setup instructions.

---

### 2. Install Node.js via NVM & Setup Github SSH

```
Install Node Version Manager (NVM):


$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.6/install.sh | bash


Load NVM into your terminal session:

$ export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"


Install the latest LTS (Long Term Support) version of Node.js:

$ nvm install --lts
$ nvm use --lts


Check installation:

$ node -v
$ npm -v


3. Add Your SSH Key (for GitHub access)
Generate an SSH key (if you don’t have one):

$ ssh-keygen


Copy your public key and add it to GitHub:

$ cat ~/.ssh/id_ed25519.pub


Paste the output in GitHub → Settings → SSH and GPG keys → New SSH key.


4. Install Project Dependencies

Navigate to the project directory:

$ cd path/to/music-app/frontend


Install dependencies:

$ npm install
# or if using pnpm
$ pnpm install


You’re ready to run the app locally!
```

## Usage
TODO: Add usage instructions here (how to start the app, run tests, etc.)

## Features
TODO: List key features of the app here.

## Tech Stack
TODO: List frontend, backend, database, and other technologies used.
