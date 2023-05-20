document.addEventListener('DOMContentLoaded', () => {
  const toyCollection = document.getElementById('toy-collection');

  fetch(`http://localhost:3000/toys`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const toys = data;

    toys.forEach(toy => {
      const card = document.createElement('div');
      card.classList.add('card');

      const h2 = document.createElement('h2');
      h2.textContent = toy.name;
      card.appendChild(h2);

      const img = document.createElement('img');
      img.src = toy.image;
      img.classList.add('toy-avatar');
      card.appendChild(img);

      const p = document.createElement('p');
      p.textContent = toy.likes + ' Likes';
      card.appendChild(p);

      const button = document.createElement('button');
      button.classList.add('like-btn');
      button.id = toy.id;
      button.textContent = 'Like ❤️';
      card.appendChild(button);

      toyCollection.appendChild(card);

      button.addEventListener('click', () => {
        const toyID = toy.id;
        const newLikes = toy.likes + 1;

        fetch(`http://localhost:3000/toys/${toyID}`, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
          likes: newLikes,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(updatedToy => {
          toy.likes = updatedToy.likes;
          p.textContent = updatedToy.likes + ' Likes';
        })
        .catch(error => {
          console.error('Error', error);
        });
      });
    });
  })
})

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
