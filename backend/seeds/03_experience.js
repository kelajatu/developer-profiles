
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('experience').del()
    .then(function () {
      // Inserts seed entries
      return knex('experience').truncate().insert([
        {user_id: 1, jobtitle: 'Grass Grower', jobdates: "Jul 1826 - Jan 1980", jobdescription: "grow dat grass"},
        {user_id: 2, jobtitle: 'Psychic', jobdates: "present - forever", jobdescription: "help i hate making seeds"},
        {user_id: 1, jobtitle: 'president of the mall', jobdates: "Oct 2008 - Sept 2009", jobdescription: "i was the president"}
      ]);
    });
};
