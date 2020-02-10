#!/usr/bin/env bash

if [[ ${CONFIG_VARS} ]]; then

  SPLIT=$(echo ${CONFIG_VARS} | tr "," "\n")
  ARGS=
  for VAR in ${SPLIT}; do
      ARGS="${ARGS} -v ${VAR} "
  done

  JSON=`json_env --json ${ARGS}`

  echo " ==> Writing ${CONFIG_FILE_PATH} with ${JSON}"

  echo "${JSON}" > ${CONFIG_FILE_PATH}
fi

exec "$@"
