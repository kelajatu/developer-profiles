
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      let arr = []
      let num = 500;
      while(num > 0){
        arr.push({
          userId: num,
          projtitle: faker.random.word(),
          link: faker.internet.url(),
          projdescription: faker.lorem.paragraph(),  
        })
        num--;
      }
      return knex('projects').truncate().insert(arr);
    });
};