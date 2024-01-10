#!/bin/bash

load_env(){
    cd ../envs
    PWD_ENV=${PWD}/.env
    echo "=======> Using envs from ${PWD_ENV}. <=========";
}

load_docker_compose(){
    cd ..
    DOCKER_COMPOSE_PATH=$PWD/docker-compose.yml;
    echo "=======> Using docker-compose from ${DOCKER_COMPOSE_PATH}. <=========";
}


load_write_app_env(){
    WRITE_APP_ENV_PATH=$PWD/write-app-env.sh;
    sh $WRITE_APP_ENV_PATH
}

PRODUCTION_CASE=production
DEVELOPMENT_CASE=development
DOWN_PRODUCTION_CASE=down-production
DOWN_DEVELOPMENT_CASE=down-development
STOP_DEVELOPMENT_CASE=stop-development
STOP_PRODUCTION_CASE=stop-production

options=("$PRODUCTION_CASE" "$DEVELOPMENT_CASE" "$DOWN_PRODUCTION_CASE" "$DOWN_DEVELOPMENT_CASE" "$STOP_DEVELOPMENT_CASE" "$STOP_PRODUCTION_CASE");

select opt in "${options[@]}"; do
  case "$REPLY" in
    1)
      load_write_app_env; load_env; load_docker_compose; docker-compose  -f $DOCKER_COMPOSE_PATH --env-file $PWD_ENV --profile development up --build
      ;;
    2)
      load_write_app_env; load_env; load_docker_compose; docker-compose  -f $DOCKER_COMPOSE_PATH --env-file $PWD_ENV --profile development up --build
      ;;
    3)
      load_env; load_docker_compose; docker-compose -f $DOCKER_COMPOSE_PATH --env-file $PWD_ENV --profile development  down
      ;;
    4)
      load_env; load_docker_compose; docker-compose -f $DOCKER_COMPOSE_PATH --env-file $PWD_ENV --profile development  down
      ;;
    5)
      load_env; load_docker_compose; docker-compose -f $DOCKER_COMPOSE_PATH --env-file $PWD_ENV --profile development  stop
      ;;
    6)
      load_env; load_docker_compose; docker-compose -f $DOCKER_COMPOSE_PATH --env-file $PWD_ENV --profile production stop
      ;;
    *)
      echo "Exited."
      exit 0
      ;;
  esac
done


# help(){
#     echo "cases:\n$PRODUCTION_CASE\n$DEVELOPMENT_CASE\n$DOWN_DEVELOPMENT_CASE\n$DOWN_PRODUCTION_CASE\n$STOP_DEVELOPMENT_CASE\n$STOP_PRODUCTION_CASE"
#     exit 1;
# }


# _PARAM_TARGET=$1

# case $_PARAM_TARGET in
#     "$PRODUCTION_CASE") load_write_app_env; load_env; load_docker_compose; docker-compose  -f $DOCKER_COMPOSE_PATH --env-file $PWD_ENV --profile production up --build -d;;
#     "$DEVELOPMENT_CASE") load_write_app_env; load_env; load_docker_compose; docker-compose  -f $DOCKER_COMPOSE_PATH --env-file $PWD_ENV --profile development up --build;;
#     "$DOWN_DEVELOPMENT_CASE") load_env; load_docker_compose; docker-compose -f $DOCKER_COMPOSE_PATH --env-file $PWD_ENV --profile development  down;;
#     "$DOWN_PRODUCTION_CASE") load_env; load_docker_compose; docker-compose -f $DOCKER_COMPOSE_PATH --env-file $PWD_ENV --profile development  down;;
#     "$STOP_DEVELOPMENT_CASE") load_env; load_docker_compose; docker-compose -f $DOCKER_COMPOSE_PATH --env-file $PWD_ENV --profile development  stop;;
#     "$STOP_PRODUCTION_CASE") load_env; load_docker_compose; docker-compose -f $DOCKER_COMPOSE_PATH --env-file $PWD_ENV --profile production stop;;
#   *) help;;
# esac