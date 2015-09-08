#!/bin/bash

echo "setting up project"
cassandra &
node app.js