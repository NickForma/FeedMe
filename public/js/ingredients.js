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

  ingTable = `<tr><th>Name</th><th>Amount</th></tr>`;
  for (var i = 0; i < response.ingredients.length; i++) {
    ingTable += `<tr><td class=name>${response.ingredients[i].name}</td>
      <td class="amount>${response.ingredients[i].amount.us.value} ${response.ingredients[i].amount.us.unit}
      </td></tr>`;

  }
  console.log(ingTable);
  document.getElementById("ingredientsData").innerHTML = ingTable;

});
