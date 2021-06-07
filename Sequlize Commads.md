npm install --save-dev sequelize-cli

npx sequelize-cli init
create folder structures and .sequelizerc files that maps these folders

<!-- migrations -->
npx sequelize-cli migration:create --name modify_users_add_new_fields
make migration file

npx sequelize-cli db:migrate
running migration

npx sequelize-cli db:migrate:undo
npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js

npx sequelize-cli migration:generate --name migration-skeleton

<!-- seeds -->
npx sequelize-cli seed:generate --name demo-user
creates seeder file

npx sequelize-cli db:seed:all
run seeders

npx sequelize-cli db:seed:undo
undo seeding

npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data
undo specific seeding

npx sequelize-cli db:seed:undo:all
undo all seeding