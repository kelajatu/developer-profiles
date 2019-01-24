var faker = require("faker");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  function randomFilterValue() {
    let filterOptions = ["Full Stack Web", "iOS", "Android", "UI/UX"]
    let rand = [(Math.random() * filterOptions.length) | 0]
    return filterOptions[rand]
  }
  function randomLocation(){
    let id = ['7f7b7d8118ae8db8ed3f541159ac928c484d12ad', ]
  }
  return knex("users")
    .del()
    .then(function() {
      let userArr = [];
      let num = 500;
      while (num > 0) {
        userArr.push({
          email: faker.internet.email(),
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          image: faker.image.imageUrl(),
          desired_title: faker.name.title(),
          area_of_work: randomFilterValue(),
          current_location_name: 'Random City name',
          current_location_lat: faker.address.lat(),
          current_location_lon: faker.address.log(),
          interested_location_names: `${faker.address.city()|faker.address.city()|faker.address.city()|faker.address.city()}`,
          public_email: faker.internet.email(),
          github: "github.com",
          linkedin: "linkedin.com",
          portfolio: "coolbanana.com",
          badge: "acclaim.com",
          places: "1,2",
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
