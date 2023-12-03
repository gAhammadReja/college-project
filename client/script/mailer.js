
        document.addEventListener('DOMContentLoaded', function () {
            const form = document.querySelector('#contactUs');
            const button = document.querySelector('#csubmit');        

            form.addEventListener('submit', function (event) {
            button.innerHTML='SENDING...'
                event.preventDefault();

                // Get form data
                const formData = new FormData(form);

                fetch('/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(Object.fromEntries(formData)),
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                    if (data.status === 'Message Sent ! We Will Response Soon') {
button.innerHTML=data.status;
collegeForm.reset();

                    } else {
                        alert('Sorry, we are unable to send your message now.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            });
        });
    