
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('topskills').del()
    .then(function () {
      // Inserts seed entries
      return knex('topskills').truncate().insert([
        {topskill: "RoR"},
        {topskill: "Ruby"},
        {topskill: "Python"}
      ]);
    });
};
