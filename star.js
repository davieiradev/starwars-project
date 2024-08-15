let currentPageUrl ='https://swapi.dev/api/starships/'

window.onload = async () => {
    try {
      await loadStarships(currentPageUrl);
    } catch (error) {
      console.log(error);
      alert('Erro ao carregar cards');
    }
  
    const nextButton = document.getElementById('next-button');
    nextButton.addEventListener('click', loadNextPage);
  
    const backButton = document.getElementById('back-button');
    backButton.addEventListener('click', loadPreviousPage);
  };
  
  async function loadStarships(url) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; // Limpa os resultados anteriores
  
    try {
      const response = await fetch(url);
      const responseJson = await response.json();
  
      responseJson.results.forEach((starships) => {
        const card = document.createElement("div");
        card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/starships/${starships.url.replace(/\D/g, "")}.jpg')`
        card.className = "cards"
        const starshipsNameBG = document.createElement("div")
      starshipsNameBG.className = "starships-name-bg"
        const starshipsName = document.createElement("span")
     starshipsName.className = "starships-name"
     starshipsName.innerText = `${starships.name}`
    starshipsNameBG.appendChild(starshipsName)
        card.appendChild(starshipsNameBG)
        card.onclick = () => {
          const modal = document.getElementById("modal")
          modal.style.visibility = "visible"
          const modalContent = document.getElementById("modal-content")
          modalContent.innerHTML = ''
  
          const starshipsImage = document.createElement("div")
        starshipsImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/starships/$starships.url.replace(/\D/g, "")}.jpg')`
        starshipsImage.className = "starships-image"
  
          const name = document.createElement("span")
          name.className = "starships-details"
          name.innerText = `Nome: ${starships.name}`
  
          const model = document.createElement("span")
          model.className = "starships-details"
          model.innerText = `Modelo: ${convertModel(starships.model)}`
  
          const passengers = document.createElement("span")
          passengers.className = "starships-details"
          passengers.innerText = `Passageiros: ${convertPassengers(starships.passengers)}`
  
          const length = document.createElement("span")
          length.className = "starships-details"
          length.innerText = `Comprimento: ${convertLength(starships.length)}`
  
          const manufacturer = document.createElement("span")
          manufacturer.className = "starships-details"
          manufacturer.innerText = `Fabricante: ${convertManufacturer(starships.manufacturer)}`
  
          modalContent.appendChild(starshipsImage)
          modalContent.appendChild(name)
          modalContent.appendChild(model)
          modalContent.appendChild(passengers)
          modalContent.appendChild(length)
          modalContent.appendChild(manufacturer)
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
      throw new Error('Erro ao carregar starships');
    }
  }
  
  function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
  }

  function convertModel(model) {
    if (model === "unknown") {
      return "desconhecido";
    }
    
    return model;
  }

  function convertPassengers(passengers) {
    if (passengers === "unknown") {
      return "desconhecido";
    }
    
    return passengers;
  }

  function convertLength(length) {
    if (length === "unknown") {
      return "desconhecida";
    }
    
    return length;
  }


  function convertManufacturer(manufacturer) {
    if (manufacturer === "unknown") {
      return "desconhecido";
    }
    
    return manufacturer;
  }
 
  async function loadNextPage() {
    if (!currentPageUrl) return;
  
    try {
      const response = await fetch(currentPageUrl);
      const responseJson = await response.json();
  
      await loadStarships(responseJson.next);
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
  
      await loadStarships(responseJson.previous);
    } catch (error) {
      console.log(error);
      alert('Erro ao carregar a página anterior');
    }
  }