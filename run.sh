#!/bin/bash

node ./bot.js > "./logs/$(date +%d-%m-%Y_%H:%M:%S)_log.txt"