#!/bin/bash
apt update && apt upgrade -y
apt install nodejs yarn ffmpeg imagemagick -y
cd cordy-bot
yarn install
yarn start

