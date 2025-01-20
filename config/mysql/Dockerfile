FROM mysql:8.0

COPY config/mysql/db.sql /docker-entrypoint-initdb.d/
COPY config/mysql/inserts.sql /docker-entrypoint-initdb.d/