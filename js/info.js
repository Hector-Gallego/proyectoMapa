window.addEventListener("load", function () {


    let id = localStorage.getItem("id");
    console.log(id);

    fetch(`https://624c52f8d71863d7a8084eb9.mockapi.io/api/empresas/${id}`)
        .then(data => data.json())
        .then(data => {
            console.log(data);
            mostrarInfo(data);
        })
        .catch(error => {
            console.log("ha ocurrido un error" + error);
        });

    function mostrarInfo(data) {
        let datos = `
        codigo: ${data.id}
        nombre: ${data.nombre}
        latitud: ${data.lat}
        longitud ${data.lng}`;
        let div = document.getElementById("info");
        let parrafo = document.createElement("p");
        parrafo.innerText = datos;
        div.append(parrafo);
    }


});