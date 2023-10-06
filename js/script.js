const URL = ' https://japceibal.github.io/japflix_api/movies-data.json';
const btn = document.getElementById('btnBuscar')
const container = document.getElementById('lista')

btn.addEventListener('click', () => {
    const buscador = document.getElementById('inputBuscar').value
    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
        comparar(data)
    })
    .catch((error) => {
        console.error("mensaje de error", error);
    });

    function comparar (arr){
        arr.forEach(element => {
            let generos =""
            element.genres.forEach(genero =>
                generos += ' '+ genero.name + ' '
                )
            let strings = element.title + element.tagline + element.overview + generos
            if (strings.toLowerCase().includes(buscador.toLowerCase())){
                container.innerHTML +=
                `<li class='list-group-item'>
                    ${element.title}
                    <br>
                    ${element.tagline}
                    <br>
                    ${addStars(element)}
                    <br>
                    <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">More Info</button>
                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasRightLabel">${element.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <h5>Overview</h5>
                        <p>${element.overview}</p>
                        <hr>
                        <h5>Genres</h5>
                        <p>${generos}</p>
                        <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        More
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Year: ${element.release_date}</a></li>
                        <li><a class="dropdown-item" href="#">Runtime: ${element.runtime}</a></li>
                        <li><a class="dropdown-item" href="#">Budget: ${element.budget}</a></li>
                        <li><a class="dropdown-item" href="#">Revenue: $${element.revenue}</a></li>
                    </ul>
                    </div>
                    </div>
                    </div>
                </li>`                
            }
    })
};
    
    function addStars(data) {
        let datos= ''
        for (let i = 1; i <= 10; i+=2) {
          if (i <= data.vote_average) {
            datos += `<span class="fa fa-star checked"></span>`;
          } else {
            datos += `<span class="fa fa-star"></span>`;
          }
        }
        return datos
      }
})