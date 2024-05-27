import type { Knex } from "knex";

const tableName = 'scores'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(tableName, (t)=>{
        t.uuid('id');
        t.integer('score');
    })
}


export async function down(knex: Knex): Promise<void> {
}

