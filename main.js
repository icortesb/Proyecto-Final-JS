let carrito = [];
const milisegundosPorDIa = 86400000;

const listaProductos = document.getElementById("lista-productos");

class Prenda {
  constructor(id, nombre, precio, talle) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.talle = talle;
  }

  setTalle(talle) {
    this.talle = talle;
  }

  setFechaCompra() {
    this.fechaDeCompra = new Date();
  }

  getIva() {
    return this.precio * 1.27;
  }

  getFechaDevolucion() {
    if (this.fechaDeCompra) {
      const fechaDevolucion = new Date(
        this.fechaDeCompra.getTime() + 30 * milisegundosPorDIa
      );
      return fechaDevolucion.toDateString();
    } else {
      return "Fecha de devolución no disponible";
    }
  }
}

const agregarPrenda = (prenda) => {
  if (prenda.talle === "Sin talle") {
    Toastify({
      text: "Debe seleccionar un talle primero",
      style: {
        background: "red",
        color: "white",
      },
    }).showToast();
  } else {
    const nuevaPrenda = new Prenda(
      prenda.id,
      prenda.nombre,
      prenda.precio,
      prenda.talle
    );
    carrito.push(nuevaPrenda);
    Swal.fire({
      title: "Éxito",
      text: "Prenda agregada correctamente",
      icon: "success",
    });
    console.log(carrito);
    actualizarListaProductos();
    actualizarPrecioFinal();
    guardarCarritoEnLocalStorage();
  }
};

// Setear talle por defecto para que no cause problemas al actualizar pagina por el evento change

const setTallePredeterminado = () => {
  const selectoresTalle = document.querySelectorAll(".talle");
  selectoresTalle.forEach((selector) => {
    selector.value = "Sin talle";
  });
};

const guardarCarritoEnLocalStorage = () => {
  // Guardar el carrito en el localStorage convirtiéndolo a una cadena de texto
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const actualizarListaProductos = () => {
  listaProductos.innerHTML = "";
  carrito.forEach((producto) => {
    const li = document.createElement("li");
    li.textContent = `${producto.nombre} - Talle: ${producto.talle} - Precio: $${producto.precio}`;
    listaProductos.appendChild(li);
  });
};

const actualizarPrecioFinal = () => {
  const precioFinal = carrito.reduce(
    (total, prenda) => total + prenda.getIva(),
    0
  );
  const precioFinalElement = document.getElementById("precio-final");
  if (precioFinalElement) {
    precioFinalElement.textContent = `Precio final con IVA: $${precioFinal}`;
  } else {
    const nuevoPrecioFinalElement = document.createElement("li");
    nuevoPrecioFinalElement.id = "precio-final";
    nuevoPrecioFinalElement.textContent = `Precio final con IVA: $${precioFinal}`;
    listaProductos.appendChild(nuevoPrecioFinalElement);
  }
};

const eliminarUltimoProducto = () => {
  if (carrito.length > 0) {
    carrito.pop();
    actualizarListaProductos();
    actualizarPrecioFinal();
    guardarCarritoEnLocalStorage();
  }
};

// Obtener el carrito almacenado en el localStorage (si existe)
const carritoGuardado = localStorage.getItem("carrito");

// Si hay un carrito almacenado, cárgalo en la variable carrito
if (carritoGuardado) {
  const carritoParseado = JSON.parse(carritoGuardado);
  carrito = carritoParseado.map(
    (item) => new Prenda(item.id, item.nombre, item.precio, item.talle)
  );
  actualizarListaProductos();
  actualizarPrecioFinal();
  setTallePredeterminado();
}
// Remera blanca
const remeraBlanca = new Prenda(1, "Remera Blanca", 5000, "Sin talle");

const selectTalleRemeraBlanca = document.getElementById("talle-remera-blanca");
selectTalleRemeraBlanca.addEventListener("change", function () {
  const talleSeleccionado = selectTalleRemeraBlanca.value;
  remeraBlanca.setTalle(talleSeleccionado);
});

const agregarRemeraBlanca = document.getElementById("agregar-remera-blanca");
agregarRemeraBlanca.onclick = function () {
  agregarPrenda(remeraBlanca);
};

// Remera negra
const remeraNegra = new Prenda(2, "Remera Negra", 4000, "Sin talle");

const selectTalleRemeraNegra = document.getElementById("talle-remera-negra");
selectTalleRemeraNegra.addEventListener("change", function () {
  const talleSeleccionado = selectTalleRemeraNegra.value;
  remeraNegra.setTalle(talleSeleccionado);
});

const agregarRemeraNegra = document.getElementById("agregar-remera-negra");
agregarRemeraNegra.onclick = function () {
  agregarPrenda(remeraNegra);
};

// Remera roja
const remeraRoja = new Prenda(3, "Remera Roja", 3500, "Sin talle");

const selectTalleRemeraRoja = document.getElementById("talle-remera-roja");
selectTalleRemeraRoja.addEventListener("change", function () {
  const talleSeleccionado = selectTalleRemeraRoja.value;
  remeraRoja.setTalle(talleSeleccionado);
});

const agregarRemeraRoja = document.getElementById("agregar-remera-roja");
agregarRemeraRoja.onclick = function () {
  agregarPrenda(remeraRoja);
};

// Ofertas

// Remera Ibiza
const remeraIbiza = new Prenda(1, "Remera Ibiza", 1500, "Small");
document.addEventListener("click", function (event) {
  if (event.target && event.target.id.startsWith("agregar-oferta1")) {
    agregarPrenda(remeraIbiza);
  }
});

// Jean Tokio
const jeanTokio = new Prenda(2, "Jean Tokio", 2500, "Large");
document.addEventListener("click", function (event) {
  if (event.target && event.target.id.startsWith("agregar-oferta2")) {
    agregarPrenda(jeanTokio);
  }
});

// Gorra Los Angeles
const gorraLosAngeles = new Prenda(3, "Gorra Los Angeles", 3500, "Large");
document.addEventListener("click", function (event) {
  if (event.target && event.target.id.startsWith("agregar-oferta3")) {
    agregarPrenda(gorraLosAngeles);
  }
});

// Zapatillas Frankfurt
const zapatillasFrankfurt = new Prenda(
  4,
  "Zapatillas Frankfurt",
  4500,
  "Medium"
);
document.addEventListener("click", function (event) {
  if (event.target && event.target.id.startsWith("agregar-oferta4")) {
    agregarPrenda(zapatillasFrankfurt);
  }
});

// Bermuda Jean Cancun
const jeanCancun = new Prenda(5, "Bermuda Cancun", 5500, "Small");
document.addEventListener("click", function (event) {
  if (event.target && event.target.id.startsWith("agregar-oferta5")) {
    agregarPrenda(jeanCancun);
  }
});

// Eliminar último
const btnEliminar = document.getElementById("eliminar-ultimo");
btnEliminar.onclick = function () {
  eliminarUltimoProducto();
};

// Finalizar compra

const finalizarCompra = document.getElementById("finalizar-compra");
finalizarCompra.onclick = function () {
  let precioFinal = document.getElementsByClassName("precio-final")[0];
  precioFinal.style.display = "none";
  carrito[0].setFechaCompra();

  listaProductos.style.display = "none";
  Swal.fire({
    title: "¡Compra en camino!",
    text: `Gracias por comprar con nosotros. Su compra será entregada en los próximos 30 días.`,
    icon: "info",
  });
};

// Nuevo

let botonOfertas = document.getElementById("btn-ofertas");
let ocultarOfertas = document.getElementById("ocultar-ofertas");
let spinner = document.getElementById("spinner");

// Mostrar ofertas
botonOfertas.onclick = () => {
  let spinner = document.getElementById("spinner");
  spinner.style.display = "block";

  setTimeout(() => {
    spinner.style.display = "none";
    botonOfertas.style.display = "none";
    ocultarOfertas.style.display = "block";
    console.log("Ofertas cargadas");

    // Simular posibilidad de error
    if (Math.random() < 0.7) {
      // Usar fetch para obtener los datos del archivo ofertas.json
      fetch("ofertas.json")
        .then((response) => response.json())
        .then((data) => {
          let contenedorOfertas = document.getElementById("ofertas-contenedor");
          contenedorOfertas.style.display = "block";
          contenedorOfertas.innerHTML = ""; // Limpiar el contenido existente

          data.forEach((oferta) => {
            let contenedor = document.createElement("div");
            contenedor.classList.add("ofertas");
            contenedor.innerHTML = `
                <h3>${oferta.nombre}</h3>
                <div class="oferta-descripcion">
                <p>Precio: <span> $${oferta.precio} </span> </p>
                <p>Talle: <span> ${oferta.talle} </span> </p>
                <p>Modelo: <span> ${oferta.modelo} </span> </p>
                </div>              
                <button id= "agregar-oferta${oferta.id}" class="btn btn-primary agregar-oferta">Agregar al carrito</button>
                <img src="./assets/oferta${oferta.id}.jpg" alt="" class="oferta-img" width="50%" height="50%">
              `;
            contenedorOfertas.appendChild(contenedor);
          });
        })
        .catch((error) => {
          console.error("Error al cargar las ofertas:", error);
          Toastify({
            text: error,
            style: {
              background: "red",
              color: "white",
            },
          }).showToast();
        });
    } else {
      botonOfertas.style.display = "block";
      ocultarOfertas.style.display = "none";
      // Simular un error aleatorio
      let errorMessage =
        "Error al cargar las ofertas. Por favor, intenta de nuevo más tarde.";
      console.error(errorMessage);
      Toastify({
        text: errorMessage,
        style: {
          background: "red",
          color: "white",
        },
      }).showToast();
    }
  }, 500);
};

// Ocultar ofertas

ocultarOfertas.onclick = () => {
  let contenedorOfertas = document.getElementById("ofertas-contenedor");
  contenedorOfertas.style.display = "none";
  botonOfertas.style.display = "block";
  ocultarOfertas.style.display = "none";
};
