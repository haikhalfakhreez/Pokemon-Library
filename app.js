let currentPageUrl = "https://pokeapi.co/api/v2/pokemon";
let setNextPage, setPrevPage;

// Fetch data of pokemon library with links to each pokemon
function reloadContent(url) {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setNextPage = data.next;
        setPrevPage = data.previous;
        
        // Load More
        if (setPrevPage == null) {
          prevBtn.disabled = true;
        }else {
          prevBtn.disabled = false;
        }

        if (setNextPage == null) {
            nextBtn.disabled = true;
        }else {
            nextBtn.disabled = false;
        }

        let pokemonContainer = document.getElementById('poke-container');
        pokemonContainer.innerHTML = "Loading...";
        pokemonContainer.innerHTML = '';

        data.results.forEach(poke => {          
          fetchPokemon(poke) 
        })
      })
      .catch(err => console.log(err))
};

// Fetch data of each pokemon
function fetchPokemon(poke){
  let url = poke.url
    fetch(url)
    .then(res => res.json())
    .then((pokeData) => {
      let pokemonContainer = document.getElementById('poke-container');
      let output = "";
      
      // Capitalize first letter
      String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
      }
      let name = pokeData.name.capitalize();

      // Types
      let typesArr = []
      pokeData.types.map(item => {
        typesArr.push(item['type']['name'])
      })
      typesArr = typesArr.join(", ");

      output += `
      <div class="card pokecard mb-3" data-aos="zoom-in">
        <img src="https://pokeres.bastionbot.org/images/pokemon/${pokeData.id}.png" alt="${pokeData.name}" class="card-img-top p-3">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">#${pokeData.id}</h6>
          <p>${typesArr}</p>
        </div>
      </div>
      `;
      
      pokemonContainer.innerHTML += output;
    })
}


const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');

// Load More Button
prevBtn.addEventListener('click', () => {
  reloadContent(setPrevPage)
});

nextBtn.addEventListener('click', () => {
  reloadContent(setNextPage)
});


reloadContent(currentPageUrl);