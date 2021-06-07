#!/bin/bash

git remote add production ssh://root@134.209.203.56$SERVER_PROJECT_DIRECTORY

git push --force production master

ssh root@134.209.203.56 "cd $SERVER_PROJECT_DIRECTORY && npm install && sudo systemctl restart gitlam_git.service && exit"
