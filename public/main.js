$(document).ready(function(event) { 
            // const display = document.getElementById('display');
            // const form = document.getElementById('form');
            // const hotDogUserInput = document.getElementById('hotDogUserInput');
            // const message = document.getElementById('message');
       const hotDogRoute = '/hot-dogs';

       const loadHotDogs = () => {
              fetch(hotDogRoute).then((response) => {
                     response.json().then(data => {
                            const hotDogList = $('#hod-dog-list');

                            const listItems = data.map((hotDog) => {
                                   return `<li class="list-group-item">
                                   <input style="border: none;" value='${hotDog.title}' disabled />
                                   <button type="button" class='edit-hot-dog-button btn btn-warning' data-id=${hotDog._id}>edit</button>
                                   <button type="button" class='delete-hot-dog-button  btn btn-danger' data-id=${hotDog._id}>delete</button>
                                   </li>`
                            });

                            hotDogList.html(listItems);
                     });
              });
       }

       loadHotDogs();

       $('#add-hot-dog-button').click(event => {
              const title = $('#hotDogTitleInput').val();
              
              fetch(hotDogRoute, {
                     method: 'POST',
                     headers: {
                            'Content-Type': 'application/json'
                     },
                     body: JSON.stringify({ title })
              })

              loadHotDogs();
       });

       $(document).on('click', '.delete-hot-dog-button', event => {
              const deleteButtonId = $(event.target)[0].getAttribute('data-id');

              fetch(hotDogRoute + '/' + deleteButtonId, {
                     method: 'DELETE'
              })

              loadHotDogs();
       });

       $(document).on('click', '.edit-hot-dog-button', event => {
              const editButton = $($(event.target)[0]);
              const currentInput = editButton.prev();
              const hotDogId = editButton.attr('data-id');

              currentInput.prop('disabled', false);
              editButton.html('save');

              editButton.click(() => {
                     fetch(hotDogRoute + '/' + hotDogId, {
                            method: 'PUT',
                            headers: {
                                   'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ title: currentInput.val() })
                     }).then(() => loadHotDogs())
              });
       });
 });