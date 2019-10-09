"use strict";
const querystring = require("querystring");
const https = require("https");
const Birthdays = use("App/Models/Birthdays");

const DB = use("Database");

class BirthdayController {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  async index({ request }) {
    const data = {
      first_name: "first_name",
      id: "id"
      // last_name: "last_name",
      // childs_name: "childs_name",
      // child_age: "child_age",
      // number: "number",
      // email: "email",
      // numKids: "numKids",
      // price: "price",
      // hour: "hour",
      // minute: "minute"
      // // one_character,
      // // two_characters,
      // // additional_hour,
      // // full_sheet_cake,
      // // fifteen_min_rental,
      // // thirty_min_rental,
      // // vanilla,
      // // chocolate,
      // // cotton_candy,
      // // popcorn,
      // // premium_snacks,
      // // jape,
      // // zumbini,
      // // premium_cake,
      // // piniata,
      // // character_one_name,
      // // character_two_name
    };
    const first_name = DB.select(data).from("birthdays");
    return await first_name;
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
    // await birthdays.save();
    return await birthdays;
  }

  setBilling(billingInformation) {
    // Validate that passed in information contains valid keys
    const validBillingKeys = [
      "first_name",
      "last_name",
      "company",
      "address1",
      "address2",
      "city",
      "state",
      "zip",
      "country",
      "phone",
      "fax",
      "email"
    ];

    for (let key in billingInformation) {
      if (!validBillingKeys.includes(key)) {
        throw new Error(`Invalid key provided in billingInformation. '${key}' 
            is not a valid billing parameter.`);
      }
    }

    this.billing = billingInformation;
  }

  setShipping(shippingInformation) {
    // Validate that passed in information contains valid keys
    const validShippingKeys = [
      "shipping_first_name",
      "shipping_last_name",
      "shipping_company",
      "shipping_address1",
      "address2",
      "shipping_city",
      "shipping_state",
      "shipping_zip",
      "shipping_country",
      "shipping_email"
    ];

    for (let key in shippingInformation) {
      if (!validShippingKeys.includes(key)) {
        throw new Error(`Invalid key provided in shippingInformation. '${key}' 
            is not a valid shipping parameter.`);
      }
    }

    this.shipping = shippingInformation;
  }

  doSale(amount, ccNum, ccExp, cvv) {
    let requestOptions = {
      type: "sale",
      amount: amount,
      ccnumber: ccNum,
      ccexp: ccExp,
      cvv: cvv
    };

    // Merge together all request options into one object
    Object.assign(requestOptions, this.billing, this.shipping);

    // Make request
    this.doRequest(requestOptions);
  }

  doRequest(postData, { request }) {
    const hostName = "secure.tigergateway.net";
    const path = "/api/transact.php";

    postData.username = this.username;
    postData.password = this.password;
    postData = querystring.stringify(postData);

    const options = {
      hostname: hostName,
      path: path,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(postData)
      }
    };

    // Make request to Direct Post API
    const req = https.request(options, response => {
      console.log(`STATUS: ${response.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(response.headers)}`);

      response.on("data", chunk => {
        console.log(`BODY: ${chunk}`);
      });
      response.on("end", () => {
        console.log("No more data in response.");
      });
    });

    req.on("error", e => {
      console.error(`Problem with request: ${e.message}`);
    });

    // Write post data to request body
    req.write(postData);
    req.end();
  }
}

const dp = new BirthdayController("jlinquata", "serendipitys88");
const billingInfo = {
  first_name: "Test",
  last_name: "User",
  address1: "123 Main St",
  city: "New York",
  state: "NY",
  zip: "12345"
};
const shippingInfo = {
  shipping_first_name: "User",
  shipping_last_name: "Test",
  shipping_address1: "987 State St",
  shipping_city: "Los Angeles",
  shipping_state: "CA",
  shipping_zip: "98765"
};

dp.setBilling(billingInfo);
dp.setShipping(shippingInfo);
// Set dummy data for sale
dp.doSale("100.00", "4111111111111111", "1221", "123");

module.exports = BirthdayController;
