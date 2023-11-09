const baseURL = `https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-FT-SF`;


const state = {
  allPuppies: [],
  cards: [],
  singlePuppy: {},
  allTeams: []
};

const main = document.querySelector('main');
main.setAttribute('style', 'display:flex; flex-direction:row; flex-wrap:wrap');

try {
  const getAllPuppies = async () => {
    const response = await fetch(`${baseURL}/players`);
    const jsonresponse = await response.json();
    state.allPuppies = jsonresponse.data.players;
    console.log(state.allPuppies);
    renderAllPuppies(state.allPuppies);
  }

  const getPlayerId = async (playerId) => {
    const response = await fetch(`${baseURL}/players/${playerId}`);
    const jsonresponse = await response.json();
    state.singlePuppy = jsonresponse.data.player;
    renderSinglePuppy(state.singlePuppy);
  }

  const getAllTeams = async () => {
    const response = await fetch(`${baseURL}/teams`);
    const jsonresponse = await response.json();
    state.allTeams = jsonresponse.data.teams;
    console.log(state.allTeams);
    renderAllTeams(state.allTeams);
  }

  const getSinglePuppy = async (id) => {
    const response = await fetch(`${baseURL}/players/${id}`);
    const jsonresponse = await response.json();
    state.singlePuppy = jsonresponse.data.player;
    renderSinglePuppy(state.singlePuppy);
  }

  const renderCard = (puppy) => {
    return `
            <div style = "height:350px; width:250px;
                            border:3px solid black;
                            margin:5px;
                            display:flex;
                            flex-direction:column;
                            justify-content:space-around;
                            align-items:center">
                <h2>${puppy.name}</h2>
                <img src = ${puppy.imageUrl} 
                    style = "height: 250px; 
                            width: 200px"
                    alt = "puppy image"/>
            </div>
    `
  }

  const renderDetailCard = (puppy) => {
    return `
    <div style = "height:1000px; width:600px;
                    border:3px solid black;
                    margin:5px;
                    display:flex;
                    flex-direction:column;
                    justify-content:space-around;
                    align-items:center">
        <h2>${puppy.name}</h2>
        <img src = ${puppy.imageUrl} 
            style = "height: 500px; 
                    width: 400px"
            alt = "puppy image"/>
        <button>Back To All Puppies</button>
    </div>
    console.log(playerId);
`;
  }


  const renderAllPuppies = (puppies) => {
    for (let i = 0; i < puppies.length; i++) {
      state.cards[i] = document.createElement('span');
      state.cards[i].innerHTML = renderCard(puppies[i]);
      main.appendChild(state.cards[i]);
    }

    for (let i = 0; i < puppies.length; i++) {
      state.cards[i].addEventListener('click', () => {
        getSinglePuppy(puppies[i].id);
      })
    }


  }

  const renderSinglePuppy = (puppy) => {
    const detailCard = document.createElement('span');
    detailCard.innerHTML = renderDetailCard(puppy);
    main.replaceChildren(detailCard);


    const backButton = document.querySelector('button');
    backButton.addEventListener('click', () => {
      main.innerHTML = '';
      getAllPuppies();
    });


  }
  getAllPuppies();
} catch (error) { console.error(error); }
