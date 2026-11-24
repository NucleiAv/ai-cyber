#!/bin/bash

REGISTRY_URI=$1

if [ -z "$REGISTRY_URI" ]; then
  echo "Usage: ./deploy.sh <registry-uri>"
  exit 1
fi

cosign verify --key cosign.pub --allow-insecure-registry "$REGISTRY_URI" > /dev/null 2>&1

if [ $? -eq 0 ]; then
  echo "SUCCESS: Signature verified. Proceeding with deployment."
else
  echo "BLOCKED: Artifact is unsigned or signature is invalid. Deployment halted."
  exit 1
fi
