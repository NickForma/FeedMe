$.ajax({
  url: "/api/calendar",
  method: "GET"
}).then(function(response) {
  console.log(response);
  let meals = ["Breakfast", "Lunch", "Dinner"];
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  let tabledata = [];
  for (let meal of meals) {
    let data = {
      meal
    };
    for (let day of days) {
      data[day] = response.filter(function(recipe) {
        return recipe.day === day && recipe.time === meal;
      }).map(function(recipe){
        return recipe.title;
      });
    }
    tabledata.push(data);
  }

  // var tabledata = [
  //   {
  //     meal: "Breakfast",
  //     monday: [],
  //     tuesday: [],
  //     Wednesday: [],
  //     Thursday: ["yellow"],
  //     Friday: [],
  //     Saturday: [],
  //     Sunday: []
  //   },
  //   {
  //     meal: "Lunch",
  //     monday: ["NOT SALAD"],
  //     tuesday: [],
  //     Wednesday: [],
  //     Thursday: [],
  //     Friday: [],
  //     Saturday: ["BREAD"],
  //     Sunday: []
  //   },
  //   {
  //     meal: "Dinner",
  //     monday: ["MORE SALAD"],
  //     tuesday: [],
  //     Wednesday: [],
  //     Thursday: ["TOAST"],
  //     Friday: [],
  //     Saturday: [],
  //     Sunday: []
  //   }
  // ];

  var table = new Tabulator("#example-table", {
    data: tabledata, //load row data from array
    layout: "fitColumns", //fit columns to width of table
    responsiveLayout: "hide", //hide columns that dont fit on the table
    tooltips: true, //show tool tips on cells
    addRowPos: "top", //when adding a new row, add it to the top of the table
    history: true, //allow undo and redo actions on the table
    //   pagination: "local", //paginate the data
    //   paginationSize: 7, //allow 7 rows per page of data
    movableColumns: true, //allow column order to be changed
    resizableRows: true, //allow row order to be changed
    initialSort: [
      //set the initial sort order of the data
      { column: "name", dir: "asc" }
    ],
    columns: [
      //define the table columns
      {
        title: "Meal",
        field: "meal"
      },
      {
        title: "Monday",
        field: "Monday",
        align: "center"
      },
      {
        title: "Tuesday",
        field: "Tuesday",
        align: "center"
        //   width: 50
      },
      {
        title: "Wednesday",
        field: "Wednesday",
        align: "center"
      },
      {
        title: "Thursday",
        field: "Thursday",
        align: "center"
      },
      {
        title: "Friday",
        field: "Friday",
        align: "center"
      },
      {
        title: "Saturday",
        field: "Saturday",
        align: "center"
      },
      {
        title: "Sunday",
        field: "Sunday",
        align: "center"
      }
    ]
  });
});
