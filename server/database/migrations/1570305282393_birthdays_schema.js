"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class BirthdaysSchema extends Schema {
  up() {
    this.create("birthdays", table => {
      table.increments();
      table.date("date");
      table.string("event", 255).defaultTo("null");
      table.string("first_name", 255).defaultTo("null");
      table.string("last_name", 255).defaultTo("null");
      table.string("childs_name", 255).defaultTo("null");
      table.integer("child_age").defaultTo(0);
      table.string("number", 10).defaultTo("null");
      table.string("email", 255).defaultTo("null");
      table.integer("numKids").defaultTo(0);
      table.integer("price").defaultTo(0);
      table.string("hour", 2).defaultTo("00");
      table.string("minute", 2).defaultTo("00");
      table.boolean("one_character");
      table.boolean("two_characters");
      table.boolean("additional_hour");
      table.boolean("full_sheet_cake");
      table.boolean("fifteen_min_rental");
      table.boolean("thirty_min_rental");
      table.boolean("vanilla");
      table.boolean("chocolate");
      table.boolean("cotton_candy");
      table.boolean("popcorn");
      table.boolean("premium_snacks");
      table.boolean("jape");
      table.boolean("zumbini");
      table.boolean("premium_cake");
      table.boolean("piniata");
      table.string("character_one_name").defaultTo("null");
      table.string("character_two_name").defaultTo("null");
      table.timestamps();
    });
  }

  down() {
    this.drop("birthdays");
  }
}

module.exports = BirthdaysSchema;
