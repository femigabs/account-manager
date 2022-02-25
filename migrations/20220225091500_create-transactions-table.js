/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('transactions', (table) => {
        table.increments();
        table.integer('user_account').notNullable();
        table.integer('receiver_account');
        table.string('transaction_id').notNullable();
        table.enu('type', ['deposit', 'withdrawal', 'transfer'], {enumName: 'transaction_type'})
        table.decimal('amount', 14,2).defaultTo(0);
        table.string('status');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('transactions');
};
