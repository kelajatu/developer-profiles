
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('education').del()
    .then(function () {
      // Inserts seed entries
      return knex('education').truncate().insert([
        {userId: 1, school: 'Harvard', schooldates: "Dec 2011 - June 2015", degree:"Heckin Cool Degree", course: "Cool major"},
        {userId: 2, school: 'Lambda', schooldates: "Yesterday - Today", course: "FSW"},
        {userId: 1, school: 'BootinBootcamp', schooldates: "May 1999 - Present", course: "Ur job is to learn"}
      ]);
    });
};
