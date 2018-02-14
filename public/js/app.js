const init = function() {
  const searchFile = document.querySelector('#search-keyword');
  const responseContainer = document.querySelector('#response-container');
  const buttonXhr = document.querySelector('#button-xhr');
  const buttonFetch = document.querySelector('#button-fetch');
  let apiKey = '&api-key=3254674d14ff4f1a88cdde0c9e311b49';
  let searchedForText;


  buttonXhr.addEventListener('click', function(e) {
    e.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchFile.value;
    getNews();
  });

  buttonFetch.addEventListener('click', function(e) {
    e.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchFile.value;
    let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}${apiKey}`;
    fetch(url)
      .then(function(response) {
        return response.json();
      }).then(function(data) {
        const response = data.response.docs;
        addNews(response);
      })
      .catch(function(error) {
        console.log('Se ha presentado un error');
      });
  });

  function getNews() {
    const XHR = new XMLHttpRequest();
    XHR.onreadystatechange = function() {
      if (XHR.readyState === 4 && XHR.status === 200) {
        console.log(XHR.response);
        const data = JSON.parse(this.responseText);
        const response = data.response.docs;
        console.log(response);
        XHR.onload = addNews(response); 
        XHR.onerror = handleError;
      } 
    }; 
    XHR.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}${apiKey}`);
    XHR.send();
  }

  function addNews(result) {
    if (result.length > 0) {
      result.forEach(function(article) {
        if (article.document_type === 'article') {
          const noticie = `<br><br><div class="card"  style="width: 40rem;">
          <img class="card-img-top" src="https://static01.nyt.com/${article.multimedia[0].url}" >
          <div class="card-body">
            <h2 class="card-title">${article.headline.main}</h2>
            <p class="card-text">${article.snippet}</p>
            <a  href=${article.web_url} target="_blank"  class="btn btn-primary">Ver más</a>
          </div>
        </div><br><br>`;
          responseContainer.innerHTML += noticie;
        }
      });
    } else {
      console.log('No se ha encontrado ninguna noticia, relacionado a su búsqueda');
      searchFile.value = '';
    }
  }

  function handleError(error) {
    console.log('Se ha presentado un error');
  }
};

window.addEventListener('load', init);

