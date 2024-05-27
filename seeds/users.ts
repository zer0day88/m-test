import { faker } from "@faker-js/faker";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

        await knex("users").insert([
            { id: faker.string.uuid(), name: faker.person.fullName(),role:'admin' }
        ]);

        let users = []

        const admin = {
            id: faker.string.uuid(), name: faker.person.fullName(),role:'user'
        }
        users.push(admin)

        for (let i = 0; i < 20; i++) {
           
            const user = {
                id: faker.string.uuid(), name: faker.person.fullName(),role:'user'
            }
            users.push(user)
        }

        await knex("users").insert(users);

        for (const value of users) {
            const index = users.indexOf(value);
            const score = {
                id: value.id,
                score: faker.number.int({min: 0, max: 100}),
            }
            await knex("scores").insert(score);
        }

        for (const value of users) {
            const index = users.indexOf(value);
            const score = {
                id: value.id,
                score: faker.number.int({min: 0, max: 100}),
            }
            await knex("scores").insert(score);
        }


};
