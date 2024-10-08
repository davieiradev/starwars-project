let currentPageUrl ='https://swapi.dev/api/planets/'
window.onload = async () => {
    try {
      await loadPlanets(currentPageUrl);
    } catch (error) {
      console.log(error);
      alert('Erro ao carregar cards');
    }
  
    const nextButton = document.getElementById('next-button');
    nextButton.addEventListener('click', loadNextPage);
  
    const backButton = document.getElementById('back-button');
    backButton.addEventListener('click', loadPreviousPage);
  };
  
  async function loadPlanets(url) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; // Limpa os resultados anteriores
  
    try {
      const response = await fetch(url);
      const responseJson = await response.json();
  
      responseJson.results.forEach((planet) => {
        const card = document.createElement("div");
        card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/planets/${planet.url.replace(/\D/g, "")}.jpg')`
        card.className = "cards"
        const planetNameBG = document.createElement("div")
        planetNameBG.className = "planet-name-bg"
        const planetName = document.createElement("span")
        planetName.className = "planet-name"
        planetName.innerText = `${planet.name}`
        planetNameBG.appendChild(planetName)
        card.appendChild(planetNameBG)
        card.onclick = () => {
          const modal = document.getElementById("modal")
          modal.style.visibility = "visible"
          const modalContent = document.getElementById("modal-content")
          modalContent.innerHTML = ''
  
          const planetImage = document.createElement("div")
          planetImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/planets/${planet.url.replace(/\D/g, "")}.jpg')`
          planetImage.className = "planet-image"
  
          const name = document.createElement("span")
          name.className = "planet-details"
          name.innerText = `Nome: ${planet.name}`
  
          const climate = document.createElement("span")
          climate.className = "planet-details"
          climate.innerText = `Clima: ${convertClimate(planet.climate)}`
  
          const population = document.createElement("span")
          population.className = "planet-details"
          population.innerText = `populacao: ${convertPopulation(planet.population)}`
  
          const gravity = document.createElement("span")
          gravity.className = "planet-details"
          gravity.innerText = `gravidade: ${convertGravity(planet.gravity)}`
  
          const terrain = document.createElement("span")
          terrain.className = "planet-details"
          terrain.innerText = `terreno: ${convertTerrain(planet.terrain)}`
  
          modalContent.appendChild(planetImage)
          modalContent.appendChild(name)
          modalContent.appendChild(climate)
          modalContent.appendChild(population)
          modalContent.appendChild(gravity)
          modalContent.appendChild(terrain)
        }
        const mainContent = document.getElementById('main-content');
        mainContent.appendChild(card);
  
      });
  
      // Habilita ou desabilita os botões de acordo com a presença de URLs de próxima e página anterior
      const nextButton = document.getElementById('next-button');
      const backButton = document.getElementById('back-button');
      nextButton.disabled = !responseJson.next;
      backButton.disabled = !responseJson.previous;
  
      backButton.style.visibility = responseJson.previous ? "visible" : "hidden";
  
      currentPageUrl = url;
    } catch (error) {
      throw new Error('Erro ao carregar planetas');
    }
  }
  
  function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
  }

  function convertClimate(climate) {
    if (climate === "unknown") {
      return "desconhecido";
    }
    
    return climate;
  }

  function convertPopulation(population) {
    if (population === "unknown") {
      return "desconhecida";
    }
    
    return population;
  }

  function convertGravity(gravity) {
    if (gravity === "unknown") {
      return "desconhecida";
    }
    
    return gravity;
  }


  function convertTerrain(terrain) {
    if (terrain === "unknown") {
      return "desconhecido";
    }
    
    return terrain;
  }
 
  async function loadNextPage() {
    if (!currentPageUrl) return;
  
    try {
      const response = await fetch(currentPageUrl);
      const responseJson = await response.json();
  
      await loadPlanets(responseJson.next);
    } catch (error) {
      console.log(error);
      alert('Erro ao carregar a próxima página');
    }
  }
  
  async function loadPreviousPage() {
    if (!currentPageUrl) return;
  
    try {
      const response = await fetch(currentPageUrl);
      const responseJson = await response.json();
  
      await loadPlanets(responseJson.previous);
    } catch (error) {
      console.log(error);
      alert('Erro ao carregar a página anterior');
    }
  }