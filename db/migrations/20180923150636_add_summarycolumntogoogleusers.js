exports.up = function (knex, Promise) {
    return knex.schema.table("google_users", function (table) {

        table.string("short_description");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropColumn('short_description');
};