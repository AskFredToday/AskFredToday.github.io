#!/bin/sh
gulp && rsync -avzhe ssh --progress af* root@askfred.today:/var/www/html/riot_tags/
