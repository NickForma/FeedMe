


var tabledata = [
  {
    meal: "Breakfast",
    monday: []
  },
  {
    meal: "Lunch",
    monday: []
  },
  {
    meal: "Dinner",
    monday: []
  }
];

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
    { title: "Meal", field: "meal" },
    {
      title: "Monday",
      field: "monday",
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
