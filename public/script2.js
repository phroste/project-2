$(document).ready(function() {
  // selecting edit form
  $("#beer").submit(function(e) {
    // preventing form from submitting
    e.preventDefault();

    // grabbing form data. 'this' is referring to the form. serialize is grabbing the info from the form
    const data = $(this).serialize();
    // selecting the beer's id from hidden input and grabbing the value from it and assigning it to a variable
    const id = $("#beer-id").val();

    console.log(`Form data: ${data}`);

    // PUT request to /beer/:beerId to update an individual beer
    $.ajax({
      //making a request to /beers/id
      url: `/beers/${id}`,
      //the form data passed to data
      data: data,
      type: "PUT",
      success: function(data) {
        console.log("response ", data);
        // redirecting to the beer's show page on success
        // when you click the submit button, this makes it so you're redirected to the new /beers/id page
        window.location.href = `/beers/${data.id}`;
      },
      error: function(xhr, status, error) {
        // add error handler
      }
    });
  });

  // delete button. adding a click event listener to id delete
  $("#delete").click(function() {
    // selecting the beer's id from hidden input
    const id = $("#beer-id").val();
    console.log(`Deleting id: ${id}`);

    // Prompt user before deleting. if you click "OK", it returns a boolean true, "CANCEL" returns false
    const confirm = window.confirm("Are you sure you want to delete this?");
    // if you click "OK", make an ajax call
    if (confirm) {
      // execute if user selects okay
      $.ajax({
        url: `/beers/${id}`, // Path
        type: "DELETE",
        success: function(data) {
          console.log("deleting ", data);

          // redirect to beers list after deleting an individual beer
          window.location.href = "/beers";
        },
        error: function(xhr, status, error) {
          // add error handler
        }
      });
    }
  });
  //select the form
  $("#new-beer").submit(function(e) {
    e.preventDefault();

    const data = $(this).serialize();
    console.log("data ", data);

    $.ajax({
      url: "/beers",
      type: "POST",
      success: function(data) {
        console.log("data received ", data);
        window.location.href = `/beers/${data.id}`;
      }
    });
  });
});
