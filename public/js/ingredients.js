var path = window.location.href;
console.log(path);

var id = $("#list").attr("data-recipeId");
console.log(id);

var queryURL =
  "https://api.spoonacular.com/recipes/" +
  id +
  "/ingredientWidget.json?apiKey=0c9667069d874559adad952a175705db";



$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {

  for (var i = 0; i < response.ingredients.length; i++) {
    var ingTable = "<tr>";
      ingTable += `<th scope="row">${i+1}</th>`;
      ingTable += `<td>${response.ingredients[i].name}</td>`;
      ingTable += `<td>${response.ingredients[i].amount.us.value} ${response.ingredients[i].amount.us.unit}</td>`;
      ingTable += "</tr>";
      $("#tableBody").append(ingTable);

  };

});
