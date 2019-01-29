var faker = require('faker')
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects')
      .del()
      .then(function () {
          let arr = []
          let num = 50;
          while(num > 0){
              arr.push({
                  user_id: num,
                  project_img: faker.image.imageUrl(),
                  project_title: faker.random.word(),
                  link: faker.internet.url(),
                  project_description: faker.lorem.paragraph(),  
              })
              num--;
          }
          return knex('projects')
              .truncate()
              .insert(arr);
      }).catch(err => {
          console.log(err)
      })
};