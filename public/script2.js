console.log("script-2 connected");

$(document).ready(function() {
  //selecting edit form
  $("#edit-movie").submit(function(e) {
    // preventing form from submitting
    e.preventDefault();

    // grabbing form data. 'this' is referring to the form. serialize is grabbing the info from the form
    const data = $(this).serialize();
    // selecting the movie's id from hidden input and grabbing the value from it and assigning it to a variable
    const id = $("#movie-id").val();
    console.log($("#movie-id"));
    console.log("id working", id);
    console.log(`Form data: ${data}`);

    // PUT request to /movies/:movieId to update an individual movie
    $.ajax({
      //making a request to /movies/id
      url: `/movies/${id}`,
      //the form data passed to data
      data: data,
      type: "PUT",
      success: function(data) {
        console.log("response ", data);
        // redirecting to the movie's show page on success
        // when you click the submit button, this makes it so you're redirected to the new /movies/id page
        // window.location.href = `/movies/${data.id}`;
        window.location.href = `/movies/`;
      },
      // add error handler
      error: function(xhr, status, error) {}
    });
  });
  // delete button. adding a click event listener to id delete

  //////////////////////////
  //     $("#delete").click(function(e) {
  //       e.preventDefault();
  //       console.log("click");
  //       // selecting the movie's id from hidden input
  //       // const id = $("#movie-id2").val();
  //       const id = e.target.getAttribute("data");
  //       const data = $(e.target).serialize();

  //       console.log(id);
  //       console.log(`Deleting id: ${id}`);
  //       console.log($("#movie-id2"));
  //       // console.log(`Form data: ${data}`);

  //       // Prompt user before deleting. if you click "OK", it returns a boolean true, "CANCEL" returns false
  //       const confirm = window.confirm("Are you sure you want to delete this?");
  //       // if you click "OK", make an ajax call
  //       if (confirm) {
  //         // execute if user selects okay
  //         $.ajax({
  //           url: `/movies/${id}/edit`, // Path
  //           data: data,
  //           type: "DELETE",
  //           success: function(data) {
  //             console.log("deleting ", data);

  //             // redirect to movies list after deleting an individual movie
  //             window.location.href = "/movies/";
  //           },
  //           error: function(xhr, status, error) {
  //             // add error handler
  //           }
  //         });
  //       }
  //     });
  //   });
  // });
  ////**************//////////
  $("#delete").click(e => {
    e.preventDefault();
    console.log("click");
    const id = e.target.getAttribute("data");
    console.log(id);
    const data = $(e.target).serialize();
    // Prompt user before deleting. if you click "OK", it returns a boolean true, deletes that movie id from the db, and redirects you to the main movies page. "CANCEL" returns false
    const confirm = window.confirm("Are you sure you want to delete this?");
    // if you click "OK", make an ajax call
    if (confirm) {
      // execute if user selects okay
      $.ajax({
        method: "delete",
        data: data,
        url: `/movies/${id}`,
        success: data => {
          window.location.href = "/movies";
        }
      });
    }
  });
});
