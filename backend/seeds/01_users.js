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
          title: faker.name.title(),
          filter: randomFilterValue(),
          location: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
          location_id: '7f7b7d8118ae8db8ed3f541159ac928c484d12ad',
          potential_location_ids: '7f7b7d8118ae8db8ed3f541159ac928c484d12ad_461065adf9f5892184abb58abf430c349d9ba76d_d08d9a5434e84e1af0f09662adb0e3a3d40c05c6_7fb969aa01ac23d5f503dbca3be639924e168007',
          potential_location_names: 'State Department Federal Credit Union, Clarendon Boulevard, Arlington, VA, USA_Los Angeles, CA, USA_Loudoun, VA, USA',
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
