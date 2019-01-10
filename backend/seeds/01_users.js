
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').truncate().insert([
        {
          email: 'coolemail@gmail.com', 
          firstname: 'Banana', 
          lastname: 'Jones', 
          title: "Frontend Developer", 
          filter: "UI/UX", 
          location: "Seattle, WA", 
          github: "github.com", 
          linkedin: "linkedin.com", 
          portfolio: "coolbanana.com", 
          badge: "acclaim.com",
          places: "1,2",
          summary: "blah blah im soo cool plz hire me wow i have no much to say but not really",
          topskills: "1,3",
          addskills: "1",
          familiar: "1,3",                                                                                          
        },
        {
          email: 'cariboulou@gmail.com', 
          firstname: 'Pineapple', 
          lastname: 'Juice', 
          title: "Bartender", 
          filter: "UI/UX", 
          location: "Malibu, CA", 
          github: "github.com", 
          linkedin: "linkedin.com", 
          portfolio: "bicardi151.com",
          badge: "acclaaim.com",
          // places: "anywhere",
          summary: "This is a summary about tech n9ne's favorite drink",
          topskills: "1,2",
          // addskills: "this other thing, sometimes this",
          // familiar: "bootstrap only",
          // projects: "not actually sure what will go here, text description?",
          // experience: "5 years of boostrap",
          // education: "1 month bootcamp 2013"
        },
      ]);
    });
};
