exports.up = function (knex, Promise) {
    return knex.schema.createTable("google_users", function (table) {
        table.increments("id");
        table.string("name");
        table.string("email");
        table.string("google_id");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable("google_users");
};
