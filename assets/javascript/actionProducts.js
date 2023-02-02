document.addEventListener('DOMContentLoaded', () => {

    // Variables
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'An mo’tsodh wítsal an ik’',
            precio: 150,
            imagen: 'assets/images/products/product11.png'
        }, {
            id: 2,
            nombre: 'wayal',
            precio: 120,
            imagen: 'assets/images/products/product9.jpg'
        }, {
            id: 3,
            nombre: 'kapēl',
            precio: 130,
            imagen: 'assets/images/products/product8.jpg'
        }, {
            id: 4,
            nombre: 'koy',
            precio: 150,
            imagen: 'assets/images/products/product10.jpg'
        },{
            id: 5,
            nombre: 'wits',
            precio: 110,
            imagen: 'assets/images/products/product2.jpg'
        },{
            id: 6,
            nombre: 'lē’',
            precio: 120,
            imagen: 'assets/images/products/product3.jpg'
        },{
            id: 7,
            nombre: 'itath',
            precio: 130,
            imagen: 'assets/images/products/product4.jpg'
        },{
            id: 8,
            nombre: 'tam',
            precio: 110,
            imagen: 'assets/images/products/product5.jpg'
        }
    ];

    let carrito = [];
    let cantidadProduct = [];
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const miLocalStorage = window.localStorage;
    const DOMProducts = document.querySelector('#shoppinCar');
    DOMProducts.textContent = window.localStorage.cantidad;

    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            // Estructura
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-md-3');
            // Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.classList.add('text-brown');
            miNodoTitle.textContent = info.nombre;
            // Imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);
            // Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${info.precio}${divisa}`;
            // Boton 
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-brown');
            miNodoBoton.textContent = 'Agregar al carrito';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', addProductsShopping);
            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }

    function addProductsShopping(evento) {
        carrito.push(evento.target.getAttribute('marcador'))
        cantidadProduct = carrito.length;
        saveShoppingLocalStorage();
    }
    function saveShoppingLocalStorage () {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
        miLocalStorage.setItem('cantidad', cantidadProduct);
        DOMProducts.textContent = cantidadProduct;
    }

    renderizarProductos();
});