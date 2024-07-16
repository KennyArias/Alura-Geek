async function cardList() {
    const parrafoError = document.querySelector("[data-error]");
    try {
        const conexion = await fetch("https://my-json-server.typicode.com/KennyArias/Challenge-AluraGeek/products");
        const convertir = await conexion.json();

        if (convertir.length === 0) {
            parrafoError.style.display = 'block';
        } else {
            parrafoError.style.display = 'none';
        }

        return convertir;
    } catch (error) {
        console.error('Hubo un error:', error);
    }
}

async function creaNuevaCard(name, price, image){
    const conexion = await fetch("https://my-json-server.typicode.com/KennyArias/Challenge-AluraGeek/products", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            name: name,
            price: price,
            image: image
        })
    });

    const conversion = conexion.json();
    return conversion;
}

async function eliminarCard(id){
    const conexion = await fetch(`https://my-json-server.typicode.com/KennyArias/Challenge-AluraGeek/products/${id}`, {
        method: "DELETE",
        headers: {"Content-Type":"application/json"}
    });
}

export const conexionAPI = {
    cardList,
    creaNuevaCard,
    eliminarCard
};
