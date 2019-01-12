exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('skills')
      .del()
      .then(function () {
          // Inserts seed entries
          return knex('skills')
              .truncate()
              .insert([
                  {skill: "RoR"},
                  {skill: "Ruby"},
                  {skill: "Python"}
              ]);
      }).catch(err => {
          console.log(err)
      })
};
