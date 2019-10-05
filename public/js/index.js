var selectedTime;
var selectedDay;

$("#submit").on("click", function() {
  event.preventDefault();
  $(".output").html(" ");
  var searchText = $("#search-text").val();
  var queryURL =
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=785fc0e6c92d43b1bc6f1749a77366e1&addRecipeInformation=true&number=10&query=" +
    searchText;
  console.log(searchText);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var data = response.results;
    for (var i=0; i < data.length; i++){
      var content = $(`
        <div class="apiContent">
          <img src="${data[i].image}" class="foodImages" alt="foodImage">
          <h6>${data[i].title}</h6>
        </div>
      `);
      content.data("cookingTime", data[i].readyInMinutes);
      content.data("analyzedInstructions", data[i].analyzedInstructions);
      content.data("servingSize", data[i].servings);
      content.data("imageURL", data[i].image);
      content.data("recipeID", data[i].id);
      content.data("title", data[i].title);
      $(".output").append(content);

    }
  });
});

$(".output").on("click", ".apiContent", function(){
  $("#recipeModal").modal("show");
  var recipe = $(this).data("analyzedInstructions");
  var image = $(this).data("imageURL");
  var readyTime = $(this).data("cookingTime");
  var recipeID = $(this).data("recipeID");
  var servingSize = $(this).data("servingSize");
  var title = $(this).data("title");
  $("#modalImage").attr("src", image);
  $("#servingSize").text(servingSize);
  $("#time").text(readyTime);
  var list = "<ol>";
  for (var j = 0; j < recipe[0].steps.length; j++){
    list += `<li>${recipe[0].steps[j].step}</li>`
  }
  list += "</ol>";
  $("#infoHolder").html(list);
  $("#day li a").click(function(){
    selectedDay = $(this).text();
  });
  $("#time li a").click(function(){
    selectedTime = $(this).text();
  });
  $("#ingSubmit").on("click", function(){
    event.preventDefault();
    console.log("I am running");
    var newPlan = {
      title: title,
      day: selectedDay,
      time: selectedTime,
      recipeID: recipeID
    };
    console.log(newPlan);
    $.post("/api/id", newPlan).then(function(data){
      console.log(data);
      window.location.href = "/ingredients/" + data.id;
    });
  });
});


// $(".output").on("click", ".apiContent", function () {
//   console.log("i am running", this);
//   $("#recipeModal").modal("show");
//   var recipe = $(this).data("analyzedInstructions");
//   console.log(recipe);
//   var image = $(this).data("imageURL");
//   var readyTime = $(this).data("cookingTime");
//   var servingSize = $(this).data("servingSize");
//   var recipeID = $(this).data("recipeID");
//   var title = $(this).data("title");
//   $("#modalImage").attr("src", image);
//   $("#servingSize").text(servingSize);
//   $("#time").text(readyTime);
//   var list = "<ol>";
//   for (var j = 0; j < recipe[0].steps.length; j) {
//     list += `<li> ${recipe[0].steps[j].step} </li>`;
//     console.log(j);
//   }
//   list += "</ol>";
//   $("#infoHolder").html(list);
//   $("#day li a").click(function () {
//     selectedDay = $(this).text();
//   });
//   $("#time li a").click(function () {
//     selectedTime = $(this).text();
//   });
//   $("#ingSubmit").on("click", function () {
//     event.preventDefault();
//       var newPlan = {
//       title: title,
//       day: selectedDay,
//       time: selectedTime,
//       recipeID: recipeID
//     };

//     module.exports = {
//       newPlan: newPlan
//     };

//     $.post("/api/id", newPlan).then(function (data) {
//       console.log(data);
//       window.location.href = "/ingredients/" + data.id;
//     });
//   });
  
// });

