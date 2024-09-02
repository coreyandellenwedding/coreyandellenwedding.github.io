#!/bin/bash

echo "starting setup"

# configure fnm environment
eval "$(fnm env --use-on-cd)"
# download and install Node.js
fnm use 20 --install-if-missing

echo "setup complete"