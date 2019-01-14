var faker = require('faker')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('education').del()
    .then(function () {
      let arr = []
      let num = 500;
      while(num > 0){
        arr.push({
          userId: num, 
          jobtitle: faker.name.jobtitle(), 
          jobdates: faker.date.between(), 
          jobdescription: faker.name.jobDescriptor()   
        })
        num--;
      }
      return knex('education').truncate().insert(arr);
    });
};

// exports.seed = function(knex, Promise) {
//   // Deletes ALL existing entries
//   return knex('experience').del()
//     .then(function () {
//       // Inserts seed entries
//       return knex('experience').truncate().insert([
//         {userId: 1, jobtitle: 'Grass Grower', jobdates: "Jul 1826 - Jan 1980", jobdescription: "grow dat grass"},
//         {userId: 2, jobtitle: 'Psychic', jobdates: "present - forever", jobdescription: "help i hate making seeds"},
//         {userId: 1, jobtitle: 'president of the mall', jobdates: "Oct 2008 - Sept 2009", jobdescription: "i was the president"}
//       ]);
//     });
// };
