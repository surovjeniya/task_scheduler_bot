PWD_APP_ENV_PATH="../../app/.env"
PWD_ENV_FILE="../envs/.env"
PWD_LOGSTASH_CONF_FILE="../logstash/logstash.conf"

# cat "$PWD_ENV_FILE" | sed -n -e'1,6p'> "$PWD_APP_ENV_PATH"
cat "$PWD_ENV_FILE" > "$PWD_APP_ENV_PATH"







