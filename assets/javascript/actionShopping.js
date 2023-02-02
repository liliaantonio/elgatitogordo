document.addEventListener('DOMContentLoaded', () => {

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
    const divisa = '$';
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#botton-empty');
    const DOMbotonPagar = document.querySelector('#button-pay');
    const miLocalStorage = window.localStorage;
    document.getElementById("goProducts").hidden = true;
    const DOMProducts = document.querySelector('#shoppinCar');
    DOMProducts.textContent = miLocalStorage.cantidad;

    function renderizarCarrito() {
        // Vaciamos todo el html
        DOMcarrito.textContent = '';
        // Quitamos los duplicados
        const carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemBaseDatos.id === parseInt(item);
            });
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
            miNodo.classList.add('font-size-22');
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-pink', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
        // Renderizamos el precio total en el HTML
        DOMtotal.textContent = calcularTotal();
        if(DOMcarrito.textContent == ''){
            DOMcarrito.textContent = 'Carrito Vacio'
        }
    }
        
    /**
    * Evento para borrar un elemento del carrito
    */
    function borrarItemCarrito(evento) {
        // Obtenemos el producto ID que hay en el boton pulsado
        const id = evento.target.dataset.item;
        cantidad = parseInt(localStorage.cantidad)
        DOMProducts.textContent = cantidad - 1;

        localStorage.cantidad = cantidad -1
        // Borramos todos los productos
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        // volvemos a renderizar
        renderizarCarrito();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();
        
    }
        
    /**
    * Calcula el precio total teniendo en cuenta los productos repetidos
    */
    function calcularTotal() {
        // Recorremos el array del carrito 
        return carrito.reduce((total, item) => {
            // De cada elemento obtenemos su precio
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            // Los sumamos al total
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }
        
    /**
    * Varia el carrito y vuelve a dibujarlo
    */
    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
        // Borra LocalStorage
        localStorage.clear();
        DOMProducts.textContent = ''
        //Mostramos boton de ir a productos
        document.getElementById("goProducts").hidden = false;
        
    }
        
    function guardarCarritoEnLocalStorage () {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }
        
    function cargarCarritoDeLocalStorage () {
        // ¿Existe un carrito previo guardado en LocalStorage?
        if (miLocalStorage.getItem('carrito') !== null) {
            // Carga la información
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }

    function pagarProductos(){
        localStorage.clear();
    }
        
    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);
    DOMbotonPagar.addEventListener('click', pagarProductos);
        
    // Inicio
    cargarCarritoDeLocalStorage();
    renderizarCarrito();
});