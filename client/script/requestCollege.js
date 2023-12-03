document.addEventListener('DOMContentLoaded', function () {
    var collegeForm = document.getElementById('collegeForm');
    var reqbutton = document.getElementById('req-button');

    collegeForm.addEventListener('submit', function (event) {
        reqbutton.value='submiting...'
        event.preventDefault(); 

        var formData = new FormData(collegeForm);

        // Fetch API to send the form data
        fetch('/requestCollege', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (response.status === 201) {
                reqbutton.value='Thank You for Your Suggetion'

                collegeForm.reset();
            }
        })
        .catch(error => {
            alert('Error: There was a problem with the request.' + error.message);
        });
    });
});