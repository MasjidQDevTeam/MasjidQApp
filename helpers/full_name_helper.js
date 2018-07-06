function full_name_helper(data) {
  var arrContainer = [];
  for (var i = 0; i < data.users.length; i++) {
    arrContainer.push(data.users[i].full_name)
  }

  return arrContainer;
}

module.exports = full_name_helper;
