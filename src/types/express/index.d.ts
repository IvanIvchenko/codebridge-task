declare namespace NodeJS {
  interface ProcessEnv {
    readonly DB_DIALECT:
      | 'mysql'
      | 'postgres'
      | 'sqlite'
      | 'mariadb'
      | 'mssql'
      | 'db2'
      | 'snowflake'
      | 'oracle';
    readonly DB_HOST: string;
    readonly DB_NAME: string;
    readonly DB_USERNAME: string;
  }
}
