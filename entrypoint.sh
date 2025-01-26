#! /bin/bash

echo $DATABASE_HOST
echo $DATABASE_PORT
echo $DATABASE_USERNAME
echo $DATABASE_NAME

# Wait for the database to be ready
echo 'Waiting for the database to be ready...'
until pg_isready -h $DATABASE_HOST -p $DATABASE_PORT -U $DATABASE_USERNAME -d $DATABASE_NAME | grep 'accepting connections'; do
  echo 'Waiting for the database to be ready...'
  sleep 2
done

echo 'Database is ready!'

#check and create database if do not exist
PGPASSWORD=$DATABASE_PASSWORD psql -h $DATABASE_HOST -p $DATABASE_PORT -U $DATABASE_USERNAME -d "postgres" -c "SELECT 1 FROM pg_database WHERE datname = '$DATABASE_NAME'" | grep -q 1 || \
    PGPASSWORD=$DATABASE_PASSWORD psql -h $DATABASE_HOST -p $DATABASE_PORT -U $DATABASE_USERNAME -d "postgres" -c "CREATE DATABASE $DATABASE_NAME";

#Generate Migrations
echo 'Generating migrations...'
export npm_config_name=vehicleMigrations
npm run migration:generate

ls -al src/migrations

npm run build

#Run Migrations
echo 'Running migrations...'
npm run migration:run

# > /dev/null 2>&1/

#install bcrypt
# npm install -g bcrypt

#Create Admin user if not exist
echo 'Creating admin user...'
PGPASSWORD=$DATABASE_PASSWORD psql -h $DATABASE_HOST -p $DATABASE_PORT -U $DATABASE_USERNAME -d $DATABASE_NAME -c "SELECT 1 FROM auth WHERE username = '$ADMIN_USERNAME'" | grep -q 1 || \
    PGPASSWORD=$DATABASE_PASSWORD psql -h $DATABASE_HOST -p $DATABASE_PORT -U $DATABASE_USERNAME -d $DATABASE_NAME -c "INSERT INTO auth (name, username, password, is_admin) VALUES ('$ADMIN_NAME', '$ADMIN_USERNAME', '$ADMIN_PASSWORD', 'true'::boolean)";

# Start the server
echo 'Starting the server...'
npm run start:dev
