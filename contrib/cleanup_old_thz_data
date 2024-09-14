#!/bin/bash

DB_FILE="thz_data.sqlite3"
sqlite3 "$DB_FILE" <<EOF
DELETE FROM systems WHERE id IN (SELECT id FROM systems ORDER BY id DESC LIMIT -1 OFFSET 10);
DELETE FROM statuses WHERE id IN (SELECT id FROM statuses ORDER BY id DESC LIMIT -1 OFFSET 10);
DELETE FROM heatpumps WHERE id IN (SELECT id FROM heatpumps ORDER BY id DESC LIMIT -1 OFFSET 10);
EOF
