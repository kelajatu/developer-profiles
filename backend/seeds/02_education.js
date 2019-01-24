var faker = require('faker')
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('education')
        .del()
        .then(function () {
            let arr = []
            let num = 500;
            while(num > 0){
                arr.push({
                    id: num,
                    school: faker.random.word(),
                    school_dates: faker.date.between(),
                    degree: faker.lorem.word(),  
                    course: faker.random.words()
                })
                num--;
            }
            return knex('education')
                .truncate()
                .insert(arr);
        }).catch(err => {
            console.log(err)
        })
  };

//~~~~~~~ keeping until migrations/seeding on heroku have been successful ~~~~~~~~~~

// exports.seed = function(knex, Promise) {
//   // Deletes ALL existing entries
//   return knex('education')
//       .del()
//       .then(function () {
//           // Inserts seed entries
//           return knex('education')
//               .truncate()
//               .insert([
//                   {user_id: 1, school: 'Harvard', school_dates: "Dec 2011 - June 2015", degree:"Heckin Cool Degree", course: "Cool major"},
//                   {user_id: 2, school: 'Lambda', school_dates: "Yesterday - Today", course: "FSW"},
//                   {user_id: 1, school: 'BootinBootcamp', school_dates: "May 1999 - Present", course: "Ur job is to learn"}
//               ]);
//       }).catch(err => {
//           console.log(err)
//       })
// };
