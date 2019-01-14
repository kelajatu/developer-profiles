exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('education')
      .del()
      .then(function () {
          // Inserts seed entries
          return knex('education')
              .truncate()
              .insert([
                  {user_id: 1, school: 'Harvard', school_dates: "Dec 2011 - June 2015", degree:"Heckin Cool Degree", course: "Cool major"},
                  {user_id: 2, school: 'Lambda', school_dates: "Yesterday - Today", course: "FSW"},
                  {user_id: 1, school: 'BootinBootcamp', school_dates: "May 1999 - Present", course: "Ur job is to learn"}
              ]);
      }).catch(err => {
          console.log(err)
      })
};
