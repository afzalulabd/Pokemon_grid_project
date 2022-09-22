var divElement = document.createElement("div");
divElement.class = "container";

var headerpoke = document.createElement("h1");
const textNode = document.createTextNode("Pokemon");
headerpoke.appendChild(textNode);
divElement.appendChild(headerpoke);

const olnode= document.createElement("ol");
olnode.id="pokemonol";
divElement.appendChild(olnode);
document.body.appendChild(divElement);


const displayPokemon = (pokemon) => {
    for (let i = 0; i < 50; i++) {
    var elem = document.createElement("li");
    elem.setAttribute("class", "card");
    
    var elem1 = document.createElement("img");
    elem1.setAttribute("class", "card-image");
    elem1.setAttribute("src", pokemon[i].image);
    elem.appendChild(elem1);

    var elem2 = document.createElement("h2");
    elem2.setAttribute("class", "card-title");
    var textNode = document.createTextNode(`${pokemon[i].id}.${pokemon[i].name}`);
    elem2.appendChild(textNode);
    elem.appendChild(elem2);

    var paragraph = document.createElement("p");
    paragraph.setAttribute("class", "card-subtitle");
   paragraph.textContent = `Abilities: ${pokemon[i].abilities}`;
   elem.appendChild(paragraph);

   var paragraph1 = document.createElement("p");
   paragraph1.setAttribute("class", "card-subtitle");
   paragraph1.textContent = `Weight: ${pokemon[i].weight}`;
   elem.appendChild(paragraph1);

   var buttonelement=document.createElement("button");
    buttonelement.appendChild(document.createTextNode("Moves"));
    buttonelement.addEventListener('click', function(){
      movespokemon(pokemon[i].moves);
  });
  
    elem.appendChild(buttonelement);

    document.getElementById('pokemonol').appendChild(elem);
    }
   document.body.appendChild(divElement);
  };

  const promises = [];
  for (let i = 1; i <= 50; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then(res => res.json()));
  }
Promise.all(promises).then(results => {
    console.log(results);
    const pokemon = results.map(data =>({ 
      name: data.name,
      id: data.id,
      image: data.sprites["front_default"],
      abilities: data.abilities.map(ability => ability.ability.name).join(", "),
      weight:data.weight,
      moves:data.moves.map(move => move.move.name).join(", "),
    }));
    displayPokemon(pokemon);
  });

//create method for displaying moves of pokemon
const movespokemon=(moves)=>{
  console.log(moves)
 alert(`Moves : ${moves}`);
}
  