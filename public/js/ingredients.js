$.get("/api/calendar", function (data) {
  
  for (var i = 0; i < data.length; i++) {
    var id = data[i].recipeID;
    var title = data[i].title;
    var queryURL =
      "https://api.spoonacular.com/recipes/" +
      id +
      "/ingredientWidget.json?apiKey=785fc0e6c92d43b1bc6f1749a77366e1";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      
      for (var j = 0; j < response.ingredients.length; j++) {
       
        var ingTable = "<tr>";
        ingTable += `<th scope="row">${j + 1}</th>`;
        ingTable += `<td>${response.ingredients[j].name}</td>`;
        ingTable += `<td>${response.ingredients[j].amount.us.value} ${response.ingredients[j].amount.us.unit}</td>`;
        ingTable += "</tr>";
        $("#tableBody").append(ingTable);

      };

    });

  }
});

// var id = $("#list").attr("data-recipeId");
// console.log(id);

// var queryURL =
//   "https://api.spoonacular.com/recipes/" +
//   id +
//   "/ingredientWidget.json?apiKey=785fc0e6c92d43b1bc6f1749a77366e1";



// $.ajax({
//   url: queryURL,
//   method: "GET"
// }).then(function (response) {

//   for (var i = 0; i < response.ingredients.length; i++) {
//     var ingTable = "<tr>";
//     ingTable += `<th scope="row">${i + 1}</th>`;
//     ingTable += `<td>${response.ingredients[i].name}</td>`;
//     ingTable += `<td>${response.ingredients[i].amount.us.value} ${response.ingredients[i].amount.us.unit}</td>`;
//     ingTable += "</tr>";
//     $("#tableBody").append(ingTable);

//   };

// });
