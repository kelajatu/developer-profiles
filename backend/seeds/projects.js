
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').truncate().insert([
        {userId: 1, projtitle: "Conway's game of life", link: "https://lizsgameoflife.netlify.com/", projdescription: "did i do thaaaaat", projimg: "https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {userId: 2, projtitle: 'Bingo', link: "coolcoolcool.commmmm", projdescription: "i made this"},
        {userId: 2, projtitle: 'Pinder: tinder but with a P', link: "myapp.com", projdescription: "i'm a genius", projimg: "https://images.pexels.com/photos/1376968/pexels-photo-1376968.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
      ]);
    });
};
