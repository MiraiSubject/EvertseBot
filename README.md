# EvertseBot


## Requirements

-   Node.js + npm
-   An operating system that complies to POSIX
-   Docker (optional)

## Installation

Clone this repository:

```
https://github.com/Bloepii/EvertseBot.git
```

On your system run:

`npm i` or `yarn install`

And lastly to run the bot do:

```npm start```

### Running in Docker

Run the following in the project folder:

```
docker build -t Bloepii/EvertseBot .
```

After that make a container of the image, start it and add the `DISCORD_TOKEN` environment variable and (optionally) the PORT variable. 
