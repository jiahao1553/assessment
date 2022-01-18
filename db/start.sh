#!/bin/bash

sleep 10

mongoimport --drop --host cafe_mongo --username root --password rootpassword --authenticationDatabase admin --db cafe --collection cafes --type json --jsonArray --file /collections/cafes.json

mongoimport --drop --host cafe_mongo --username root --password rootpassword --authenticationDatabase admin --db cafe --collection employees --type json --jsonArray --file /collections/employees.json