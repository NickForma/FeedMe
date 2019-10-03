
var selectedTime;
var selectedDay;
$("#submit").on("click", function () {
  event.preventDefault();
  $("#output").html(" ");
  var searchText = $("#search-text").val();
  var queryURL =
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=0c9667069d874559adad952a175705db&addRecipeInformation=true&number=10&query=" +
    searchText;
  console.log(searchText);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then((response) => {
    console.log(response);
    var data = response.results;
    for (var i = 0; i < data.length; i) {
      const content = $(`
        <div class = "apiContent">
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
      // var contentHolder = $("<div>");
      // contentHolder.addClass("apiContent");
      // var imageHolder = $("<img>");
      // imageHolder.addClass("foodImages");
      // imageHolder.attr("src", data[i].image);
      // contentHolder.html(`<div data-imageURL = ${data[i].image} data-cookingTime = ${data[i].readyInMinutes}
      // data-servingSize = ${data[i].servings}> ${data[i].title} </div>`);
      // contentHolder.append(imageHolder);
      $(".output").append(content);
      
    }
  });
});

$(".output").on("click", ".apiContent", function () {
  console.log("i am running", this);
  $("#recipeModal").modal("show");
  var recipe = $(this).data("analyzedInstructions");
  console.log(recipe);
  var image = $(this).data("imageURL");
  var readyTime = $(this).data("cookingTime");
  var servingSize = $(this).data("servingSize");
  var recipeID = $(this).data("recipeID");
  var title = $(this).data("title");
  $("#modalImage").attr("src", image);
  $("#servingSize").text(servingSize);
  $("#time").text(readyTime);
  var list = "<ol>";
  for (var j = 0; j < recipe[0].steps.length; j) {
    list += `<li> ${recipe[0].steps[j].step} </li>`;
    console.log(j);
  }
  list += "</ol>";
  $("#infoHolder").html(list);
  $("#day li a").click(function () {
    selectedDay = $(this).text();
  });
  $("#time li a").click(function () {
    selectedTime = $(this).text();
  });
  $("#ingSubmit").on("click", function () {
    event.preventDefault();
    var newPlan = {
      title: title,
      day: selectedDay,
      time: selectedTime,
      recipeID: recipeID
    };

    $.post("/api/id", newPlan).then(function (data) {
      console.log(data);
      window.location.href = "/ingredients/" + data.id;
    });
  });
  
});