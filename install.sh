#!/bin/bash
apt update && apt upgrade -y
apt install nodejs yarn ffmpeg imagemagick -y
yarn install
yarn start

