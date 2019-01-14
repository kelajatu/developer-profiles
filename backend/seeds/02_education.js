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
          school: faker.random.word(),
          schooldates: faker.date.between(),
          degree:faker.random.words(),
          course: faker.random.word()    
        })
        num--;
      }
      return knex('education').truncate().insert(arr);
    });
};

// exports.seed = function(knex, Promise) {
//   // Deletes ALL existing entries
//   return knex('education').del()
//     .then(function () {
//       // Inserts seed entries
//       return knex('education').truncate().insert([
//         {
//           userId: 1,
//           school: 'Harvard',
//           schooldates: "Dec 2011 - June 2015",
//           degree:"Heckin Cool Degree",
//           course: "Cool major"
//         },
//         {userId: 2, school: 'Lambda', schooldates: "Yesterday - Today", course: "FSW"},
//         {userId: 1, school: 'BootinBootcamp', schooldates: "May 1999 - Present", course: "Ur job is to learn"}
//       ]);
//     });
// };
