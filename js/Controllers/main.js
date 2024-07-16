import { conexionAPI } from "../Services/listado-de-productos.js";

const productosDivision = document.querySelector("[data-productos]");
const formulario = document.querySelector("[data-form]");




function crearCard(name, price, image, id){
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <div class="card_imagen">
            <img src="${image}" alt="${name}">
        </div>

        <div class="card_container__info">
            <p class="card_nombre">${name}</p>
            <div class="card_container__value">
                <p class="card_precio">$${price}</p>
                <button class="card_eliminar_precio" data-id="${id}">
                    <img src="img/icons8-basura-32.png" alt="Eliminar"> <!--<a target="_blank" href="https://icons8.com/icon/42858/trash">Basura</a> icono de <a target="_blank" href="https://icons8.com">Icons8</a>-->
                </button>
            </div>                 
        </div>`;
    
    productosDivision.appendChild(card);   

    return card; 
}


async function productos() {
    const listaProductos = await conexionAPI.cardList();
    if (listaProductos.length > 0) {
        listaProductos.forEach(producto => {
            productosDivision.appendChild(crearCard(producto.name, producto.price, producto.image, producto.id));
        });
    }
}


formulario.addEventListener("submit", async evento =>{
    evento.preventDefault();
    const name = document.querySelector("[data-nombre]").value;
    const price = document.querySelector("[data-precio]").value;
    const image = document.querySelector("[data-imagen]").value;

    try{
        await conexionAPI.creaNuevaCard(name, price, image);
    }catch(error){
        console.log(error);
    }
});

productosDivision.addEventListener("click", async evento=>{
    evento.preventDefault();
    const botonEliminar = evento.target.closest("[data-id]");
    const id = botonEliminar.dataset.id;
    try{
        await conexionAPI.eliminarCard(id);
        const producto = botonEliminar.closest(".card");
        producto.remove();
    }
    catch(error){
        console.log(error);
    }
});

productos();
