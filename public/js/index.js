var selectedTime;
var selectedDay;
var $email = $("#email");
var $password = $("#password");
var $loginBtn = $(".login-btn");
var $signupBtn = $(".signup-btn");



$("#submit").on("click", function () {
  event.preventDefault();
  $('html, body').animate({
    scrollTop: $("#scrolltohere").offset().top
  }, 1000);
  $(".output").html(" ");
  var searchText = $("#search-text").val();
  var queryURL =
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=785fc0e6c92d43b1bc6f1749a77366e1&addRecipeInformation=true&number=18&query=" +
    searchText;
  console.log(searchText);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    var data = response.results;
    for (var i = 0; i < data.length; i++) {
      var content = $(`
        <div class="apiContent" data-toggle="collapse" href="#collapseResult" role="button" aria-expanded="false" aria-controls="collapseResult">
          <img src="${data[i].image}" height= "150px" class="foodImages" alt="foodImage">
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

$(".output").on("click", ".apiContent", function () {

  // $("#recipeModal").modal("show");
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
  for (var j = 0; j < recipe[0].steps.length; j++) {
    list += `<li>${recipe[0].steps[j].step}</li>`;
  }
  list += "</ol>";
  $("#infoHolder").html(list);
  $("#day li a").click(function () {
    event.preventDefault();
    selectedDay = $(this).text();
  });
  $("#time li a").click(function () {
    event.preventDefault();
    selectedTime = $(this).text();
  });
  $(".dropdown-menu").on('click', 'li a', function () {
    $(this).parent().parent().siblings(".btn:first-child").html($(this).text() + ' <span class="caret"></span>');
    $(this).parent().parent().siblings(".btn:first-child").val($(this).text());
  });
  $("#ingSubmit").on("click", function () {
    event.preventDefault();
    console.log("I am running");
    var newPlan = {
      title: title,
      day: selectedDay,
      time: selectedTime,
      recipeID: recipeID
    };
    console.log(newPlan);
    if (!selectedDay || !selectedTime) {
      alert("Select Day and Time");
    }
    $.post("/api/id", newPlan).then(function (data) {
      console.log(data);
      window.location.href = "/ingredients/" + data.id;
    });
  });
});

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

// The API object contains methods for each kind of request we'll make
var API = {
  login: function (loginCreds) {
    return $.ajax({
      url: "/api/login",
      type: "POST",
      data: loginCreds
    });
  },
  signup: function (signupCreds) {
    return $.ajax({
      url: "/api/signup",
      type: "POST",
      data: signupCreds
    });
  }
};

var handleSignpBtnClick = function (event) {
  event.preventDefault();
  const signupCreds = {
    email: $email.val(),
    password: $password.val()
  };
  API.signup(signupCreds)
    .done(function (data) {
      localStorage.setItem("signedUpUserId", data.id);
      location.href = "/";
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert("Sign Up Failed! Try Again!");
      $password.val("");
    })
    .always(function () { });
};

var handleLoginBtnClick = function (event) {
  event.preventDefault();

  const loginCreds = {
    email: $email.val(),
    password: $password.val()
  };
  if (!(loginCreds.email && loginCreds.password)) {
    alert("You must enter your email and password credentials !");
    return;
  }
  API.login(loginCreds)
    .done(function (data) {
      localStorage.setItem("loggedInUserId", data.id);
      location.href = "/";
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert("Login Failed");
      $password.val("");
    })
    .always(function () { });
};

//Event listeners to the submit buttons
$loginBtn.on("click", handleLoginBtnClick);
$signupBtn.on("click", handleSignpBtnClick);

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
