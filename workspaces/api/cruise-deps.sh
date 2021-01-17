#! /bin/bash
set -e

if ! command -v dot &> /dev/null
then
  echo "dot not found please install GraphViz"
  exit 1
fi

if [ -f "deps.pdf" ]
then
  rm -f "deps.pdf"
fi


depcruise --config .dependency-cruiser.js --output-type dot src | dot -T pdf > deps.pdf
