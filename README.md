# tgdr.io

Telegram Directory (TGDR) is a website that helps you discover channels, bots and groups on Telegram.

*Contributions and bug reports are welcome.*

[https://tgdr.io](https://tgdr.io)

[![Build Status](https://travis-ci.org/thedevs-network/tgdr.svg?branch=develop)](https://travis-ci.org/thedevs-network/tgdr)
[![Contributions](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](https://github.com/thedevs-network/tgdr/#contributing)
[![GitHub license](https://img.shields.io/github/license/thedevs-network/tgdr.svg)](https://github.com/thedevs-network/tgdr/blob/develop/LICENSE)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/thedevs-network/tgdr/.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fthedevs-network%2Ftgdr%2F)

## Table of Contents
* [Key Features](#key-features)
* [Stack](#stack)
* [Development Setup](#setup)
* [Contributing](#contributing)

## Key Features
* Find channels, groups and bots in one place.
* +18 categories to choose from
* Sort by top, hot or new for each type and category
* Approve and reject entries to filter out spam.
* Like/dislike and review entries by users
* Report system for entries and comments
* Protect reviews from users that spam

## Stack
* TypeScript (Languge that compiles to JavaScript)
* Node (Web server)
* Express (Web server framework)
* Passport (Authentication)
* React (UI library)
* Next (Universal/server-side rendered React)
* Redux (State management)
* styled-components (CSS styling solution library)
* Telegraf (Telegram bot framework)
* MongoDB (NoSQL database)
* Redis (Cache layer)

## Setup
You need to have [Node.js](https://nodejs.org/), [MongoBD](https://www.mongodb.com/) and [Redis](https://redis.io/) installed on your machine.

1. Clone this repository or [download zip](https://github.com/thedevs-network/tgdr/archive/develop.zip).
2. Copy `.example.env` to `.env` and `client.config.example` to `client.config.ts` and fill them properly.
3. Install dependencies: `npm install`.
4. Make sure MongoDB is running.
5. Run for development: `npm run dev`.
6. Run for production: `npm run build` then `npm start`.

## Contributing
Pull requests are welcome. You'll probably find lots of improvements to be made.

Open issues for feedback, requesting features, reporting bugs or discussing ideas.
