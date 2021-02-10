;<?php http_response_code(403); /*
; https://github.com/PrivateBin/PrivateBin/wiki/Configuration.

[main]
discussion = true
opendiscussion = true
password = true
sizelimit = 10485760

[expire]
default = "never"

[expire_options]
; Set each one of these to the number of seconds in the expiration period,
; or 0 if it should never expire
5min = 300
10min = 600
1hour = 3600
1day = 86400
1week = 604800
; Well this is not *exactly* one month, it's 30 days:
1month = 2592000
1year = 31536000
never = 0

[formatter_options]
; Set available formatters, their order and their labels
plaintext = "Plain Text"
syntaxhighlighting = "Source Code"
markdown = "Markdown"

[purge]
; minimum time limit between two purgings of expired pastes, it is only
; triggered when pastes are created
; Set this to 0 to run a purge every time a paste is created.
limit = 300
batchsize = 10
dir = PATH "data"

[model]
class = Database
[model_options]
dsn = "pgsql:host=$_ENV['REX_DB_DATA_DB_HOST'];dbname=rex_privatebin;charset=UTF8"
tbl = "privatebin_"	; table prefix
usr = $_ENV['REX_DB_DATA_DB_USER']
pwd = $_ENV['REX_DB_DATA_DB_PASSWORD']
opt[12] = true	  ; PDO::ATTR_PERSISTENT
;*/?>
