#!/bin/bash
GREEN='\033[0;32m'
NC='\033[0m'
printf "${GREEN}Running Cassandra Driver...\n"
printf "${GREEN}Creating Cassandra base... \n${NC}"
cassandra &
cqlsh --file=cassandra_setup.cql