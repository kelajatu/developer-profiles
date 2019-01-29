var faker = require("faker");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  function randomFilterValue() {
    let filterOptions = ["Full Stack Web", "iOS", "Android", "UI/UX"]
    let rand = [(Math.random() * filterOptions.length) | 0]
    return filterOptions[rand]
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
          image: `https://picsum.photos/200/300/?image=${num % 50}`,
          desired_title: faker.name.title(),
          area_of_work: randomFilterValue(),
          current_location_name: 'Random City name',
          current_location_lat: faker.address.latitude(),
          current_location_lon: faker.address.longitude(),
          interested_location_names: `${faker.address.city()|faker.address.city()|faker.address.city()|faker.address.city()}`,
          public_email: faker.internet.email(),
          github: "github.com",
          linkedin: "linkedin.com",
          portfolio: "coolbanana.com",
          badge: "acclaim.com",
          summary: faker.lorem.sentences(),
          top_skills: "1,2,3,4,5",
          add_skills: "5,6,7,8,9,10",
          familiar: "11,12,13,14,15"
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
