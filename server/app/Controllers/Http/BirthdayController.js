"use strict";

const Birthdays = use("App/Models/Birthdays");

const DB = use("Database");

class BirthdayController {
  async index({ request }) {
    return await DB.table("birthdays");
  }

  async createCustomer({ request }) {
    // const userId = await DB.table("birthdays").insert({ first_name: "Josh" });
    const birthdays = new Birthdays();
    const {
      first_name,
      last_name,
      childs_name,
      child_age,
      number,
      email,
      numKids,
      price,
      hour,
      minute,
      one_character,
      two_characters,
      additional_hour,
      full_sheet_cake,
      fifteen_min_rental,
      thirty_min_rental,
      vanilla,
      chocolate,
      cotton_candy,
      popcorn,
      premium_snacks,
      jape,
      zumbini,
      premium_cake,
      piniata,
      character_one_name,
      character_two_name
    } = request.all();

    birthdays.fill({
      first_name,
      last_name,
      childs_name,
      child_age,
      number,
      email,
      numKids,
      price,
      hour,
      minute,
      one_character,
      two_characters,
      additional_hour,
      full_sheet_cake,
      fifteen_min_rental,
      thirty_min_rental,
      vanilla,
      chocolate,
      cotton_candy,
      popcorn,
      premium_snacks,
      jape,
      zumbini,
      premium_cake,
      piniata,
      character_one_name,
      character_two_name
    });
    birthdays.save();
    return birthdays;
  }
}

module.exports = BirthdayController;
