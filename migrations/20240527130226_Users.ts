import type { Knex } from "knex";

const tableName = 'users'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(tableName, (t)=>{
        t.uuid('id').primary();
        t.string('name',100).unique();
        t.string('role',100);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tableName);
}

