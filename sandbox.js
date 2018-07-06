const models = require('./models');


models.user.findAll({
    where: {
      user_type: "Ansor",
    },
    raw: true,
  })
  .then((userData) => {
    var arrContainer = [];
    for (var i = 0; i < userData.length; i++) {
      arrContainer.push(userData[i].id)
    }
    var userId = String(arrContainer[(Math.floor((Math.random() * arrContainer.length)))])

    var PrayerId = (Math.floor((Math.random() * 5)))
    if (PrayerId === 0) {
      PrayerId = 1
    }
    var strPrayerId = String(PrayerId)
    console.log(userId);
    console.log(strPrayerId);
  })
