const btnSearch = document.getElementById('btnSearch');

function clearSearch() {
  document.getElementById("conditionInput").value = "";
  document.getElementById("result").innerHTML = "";
}

function searchCondition() {
  const input = document.getElementById('conditionInput').value.toLowerCase();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';

  fetch('./travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
      let allDestinations = [];

      
      if (data.countries) {
        data.countries.forEach(country => {
          if (country.cities) {
            allDestinations = allDestinations.concat(country.cities);
          }
        });
      }

      
       if (data.temples) allDestinations = allDestinations.concat(data.temples);
      if (data.beaches) allDestinations = allDestinations.concat(data.beaches);

      let matched = [];

      
      if (input.includes('temple') || input.includes('temples')) {
        matched = data.temples || [];
      } 
      else if (input.includes('beach') || input.includes('beaches')) {
        matched = data.beaches || [];
      } 
      else if (data.countries) {
        
        data.countries.forEach(country => {
          if (country.name.toLowerCase().includes(input)) {
           
            if (country.cities) matched = matched.concat(country.cities);
          } else {
            
            country.cities.forEach(city => {
              if (city.name.toLowerCase().includes(input)) {
                matched.push(city);
              }
            });
          }
        });
      }

      
      
      if (matched.length > 0) {
        matched.forEach(dest => {
          resultDiv.innerHTML += `
            <div class="card" style="margin:20px; color:black; background:white; padding:15px; border-radius:10px; max-width:400px;">
              <img src="${dest.imageUrl}" alt="${dest.name}" width="100%" style="border-radius:10px;">
              <h2>${dest.name}</h2>
              <p>${dest.description}</p>
            </div>
          `;
        });
      } else {
        resultDiv.innerHTML = '<p>No destinations found.</p>';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      resultDiv.innerHTML = 'An error occurred while fetching data.';
    });
}

btnSearch.addEventListener('click', searchCondition);


const options = { timeZone: 'America/New_York', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
const newYorkTime = new Date().toLocaleTimeString('en-US', options);
console.log("Current time in New York:", newYorkTime);