# OneLink API
This is a global OneLink API that will be consumed by various internal and external applications.

## Environment
The following environment variables are required. Create the following file `.environment/.private.env` and paste:
```
# API Key to be used in tests
APIKEY_TEST=testing
APIKEY_DEV=development

# Environment & Port to boot API in
NODE_ENV=development
NODE_PORT=3000

# OneLink MySQL Database
MYSQL_TYPE=mariadb
MYSQL_HOST=10.10.78.75
MYSQL_PORT=3306
MYSQL_NAME=onelink_dev
MYSQL_USER=onelink_dev
MYSQL_PASS=onelink_dev

# OneLink Postgres API Database
POSTGRES_TYPE=postgres
POSTGRES_HOST=172.18.0.2
POSTGRES_PORT=5432
POSTGRES_NAME=development
POSTGRES_USER=development
POSTGRES_PASSWORD=development
```
