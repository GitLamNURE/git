#!/bin/bash

git remote add production ssh://root@$SERVER_IP$SERVER_PROJECT_DIRECTORY

git push --force production master

ssh root@$SERVER_IP "cd $SERVER_PROJECT_DIRECTORY && npm install && systemctl restart gitlam_git.service && exit"
