# Database files

- `schema.sql` defines the MySQL tables and constraints expected by Sequelize.
- `seed.sql` adds a small local-development dataset. Its users all use the password `demo1234`.

Docker Compose runs both files, in order, only when it creates a new empty
`osrs_mysql_data` volume. Editing either SQL file does not update an existing
volume. Run `pnpm db:reset` to deliberately delete and recreate local Docker data.

The project does not currently use Sequelize migrations. Add migrations before
making incremental schema changes against any shared or production database.
