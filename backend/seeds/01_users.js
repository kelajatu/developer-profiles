var faker = require('faker')

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users')
        .del()
        .then(function () {
            let userArr = []
            let num = 500;
            while(num > 0){
                userArr.push({
                  email: faker.internet.email(),
                  first_name: faker.name.firstName(),
                  last_name: faker.name.lastName(),
                  image: faker.image.imageUrl(),
                  title: faker.name.title(),
                  filter: faker.name.jobArea(),
                  location: `${faker.address.city()}, ${faker.address.stateAbbr()}`, 
                  github: "github.com", 
                  linkedin: "linkedin.com", 
                  portfolio: "coolbanana.com", 
                  badge: "acclaim.com",
                  places: "1,2",
                  summary: faker.lorem.sentences(),
                  top_skills: "5,6,7",
                  add_skills: "1",
                  familiar: "1,3",      
                })
                num--;
            }
            return knex('users')
                .truncate()
                .insert(userArr);
        }).catch(err => {
            console.log(err)
        })
};