let productos = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch("Lista.json")
    .then(response => response.json())
    .then(data => {
      productos = data["Listado de Productos"];
      mostrarProductos(productos);
      llenarFiltros(productos);
    });
});

function mostrarProductos(lista) {
  const tbody = document.querySelector("#tablaProductos tbody");
  tbody.innerHTML = "";

  lista.forEach((p, index) => {
    const fila = document.createElement("tr");
    const stockBajo = parseInt(p.UnidadesEnExistencia) < 10;

    fila.innerHTML = `
      <td><strong>${p.IdProducto}</strong></td>
      <td><strong>${p.NombreProducto}</strong></td>
      <td><strong>${p.Proveedor}</strong></td>
      <td><strong>${p.Categoría}</strong></td>
      <td><strong>${p.PrecioUnidad}</strong></td>
      <td class="${stockBajo ? 'stock-bajo' : ''}">
        <strong>${p.UnidadesEnExistencia}</strong>
        ${stockBajo ? '<i class="fas fa-exclamation-triangle"></i>' : ''}
      </td>
    `;
    fila.style.setProperty("--row-index", index);
    tbody.appendChild(fila);
  });
}

function llenarFiltros(productos) {
  const proveedores = [...new Set(productos.map(p => p.Proveedor))];
  const categorias = [...new Set(productos.map(p => p.Categoría))];

  const filtroProveedor = document.getElementById("filtroProveedor");
  const filtroCategoria = document.getElementById("filtroCategoria");

  proveedores.forEach(p => {
    filtroProveedor.innerHTML += `<option value="${p}">${p}</option>`;
  });

  categorias.forEach(c => {
    filtroCategoria.innerHTML += `<option value="${c}">${c}</option>`;
  });
}

function filtrarProductos() {
  const proveedor = document.getElementById("filtroProveedor").value;
  const categoria = document.getElementById("filtroCategoria").value;

  const filtrados = productos.filter(p => {
    return (
      (proveedor === "" || p.Proveedor === proveedor) &&
      (categoria === "" || p.Categoría === categoria)
    );
  });

  mostrarProductos(filtrados);
}