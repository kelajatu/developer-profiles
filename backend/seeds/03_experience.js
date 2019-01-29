var faker = require('faker')

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('experience')
        .del()
        .then(function () {
            let arr = []
            let num = 500;
            while(num > 0){
                arr.push({
                    user_id: num,
                    job_title: faker.name.jobTitle(),
                    job_dates: faker.date.between(),
                    job_description: faker.name.jobDescriptor(),  
                })
                num--;
            }
            return knex('experience')
                .truncate()
                .insert(arr);
        }).catch(err => {
            console.log(err)
        })
};