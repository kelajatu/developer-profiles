var faker = require("faker");
require("dotenv").config();

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  function randomFilterValue() {
    let filterOptions = ["Full Stack Web", "iOS", "Android", "UI/UX"]
    let rand = [(Math.random() * filterOptions.length) | 0]
    return filterOptions[rand]
  }

  function randomLocationValue() {
    let filterOptions = [
      "Albuquerque, NM, USA",
      "Calabasas, CA, USA",
      "Boston, MA, USA",
      "Santa Fe, NM, USA",
      "Tempe, AZ, USA",
      "Flagstaff, AZ, USA",
      "Boulder, CO, USA",
      "Pueblo, CO, USA",
      "South Valley, NM, USA",
      "Los Angeles, CA, USA",
      "San Francisco, CA, USA",
      "Seattle, WA, USA",
    ]
    let rand = [(Math.random() * filterOptions.length) | 0]
    return filterOptions[rand]
  }
  
  return knex("users")
    .del()
    .then(function() {
      let userArr = [];
      let num = process.env.SEEDS_NUM;
      while (num > 0) {
        userArr.push({
          email: faker.internet.email(),
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          image: `https://picsum.photos/200/300/?image=${num % 50}`,
          desired_title: faker.name.title(),
          area_of_work: randomFilterValue(),
          current_location_name: 'Random City name',
          current_location_lat: faker.address.latitude(),
          current_location_lon: faker.address.longitude(),
          interested_location_names: `${randomLocationValue()}|${randomLocationValue()}`,
          public_email: faker.internet.email(),
          github: "github.com",
          linkedin: "linkedin.com",
          portfolio: "coolbanana.com",
          badge: "acclaim.com",
          summary: faker.lorem.sentences(),
          top_skills: "5,6,7",
          add_skills: "1",
          familiar: "1,3"
        });
        num--;
      }

      return knex("users")
        .truncate()
        .insert(userArr);
    })
    .catch(err => {
      console.log(err);
    });
};
