// inicializo el mapa

window.addEventListener("load", function () {

    var map = new maplibregl.Map({
        container: 'map',
        style: 'https://api.maptiler.com/maps/bright/style.json?key=qNdmIZ9m64rdBiZYgR5v', // stylesheet location
        center: [-75.51205893586358, 10.406238591759617], // starting position [lng, lat]
        zoom: 12 // starting zoom
    });


    // realizo la peticion a la api para traer los datos de los marcadores
    fetch(`https://624c52f8d71863d7a8084eb9.mockapi.io/api/empresas`)
        .then(data => data.json())
        .then(data => {
            console.log(data);
            cargarMarcadores(data);
        })
        .catch(error => {
            // mostrar un mensaje de error y pedir que el usario regargue la pagina
            // de lo contrario que se comunique ha soporte

        })

    // funcion para agregar los marcadores al mapa
    function cargarMarcadores(data) {

        data.forEach(element => {
                console.log(element.nombre);
                let marker2 = new maplibregl.Marker({
                    color: element.color
                })
                    .setLngLat([element.lng, element.lat])
                    .addTo(map); // add the marker to the map

                addPopup(marker2, element);

            }
        );

    }


    // funcion para añadir los popups a los marcadores
    function addPopup(maker2, element) {
        let descripcion = ` Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab,
                          consectetur corporis eaque esse hic laboriosam laudantium libero, 
                          minus molestias necessitatibus nostrum, optio perferendis qui sapiente 
                          sed sequi suscipit totam. Nam?
                         `;

        console.log(element);
        // creacion de los elementos
        let div = document.createElement("div");
        let titulo = document.createElement("h3");
        let btn = document.createElement("button");
        let parrafo = document.createElement("p");


        // asignacion de contenido a los elementos
        parrafo.innerText = descripcion;
        parrafo.className = "card-title";

        titulo.innerText = element.nombre;
        titulo.className = "card-title mt-3 mb-3";

        btn.innerText = "Mas informacíon";
        btn.className = "btn btn-light btn-outline-dark mt-3 mb-3";

        div.className = "container text-center";


        div.append(titulo, parrafo, btn);


        let popup = new maplibregl.Popup().setDOMContent(div);
        maker2.setPopup(popup);

        btn.addEventListener("click", function () {
            redireccionar(element);
        });

    }

    // funcion para redirecionar a la pagina donde se mostrara la informacion
    function redireccionar(element) {

        var url = window.location.href;
        console.log(url);
        window.location.href = 'informacion.html';
        localStorage.setItem("id", element.id);
    };

    // regresar a cartagena

    let btnVolar = document.getElementById("volar");

    btnVolar.addEventListener("click", function () {
        map.flyTo({

            center: [-75.51205893586358, 10.406238591759617], // starting position [lng, lat]
            zoom: 12, // starting zoom
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
    });


});




