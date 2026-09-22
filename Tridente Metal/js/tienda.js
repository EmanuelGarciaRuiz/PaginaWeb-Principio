const pesos = n => "$" + Math.round(n).toLocaleString("es-AR");
let filtroActivo = "todos";
let carrito = [];

function espesoresDe(p){
  return (typeof ESPESORES !== "undefined" && ESPESORES[p.material]) || ["Estándar"];
}

function listaFotos(p){
  if (p.fotos && p.fotos.length) return p.fotos;
  if (p.foto) return [p.foto];
  return [];
}

document.getElementById("filtros").innerHTML = CATEGORIAS.map(c =>
  `<button class="filtro" aria-pressed="${c.id===filtroActivo}" onclick="filtrar('${c.id}')">${c.nombre}</button>`
).join("");

function filtrar(cat){
  filtroActivo = cat;
  document.querySelectorAll(".filtro").forEach((b,i)=>
    b.setAttribute("aria-pressed", CATEGORIAS[i].id === cat));
  pintarGrilla();
}

let panelMedida = 0;
let panelEspesor = 0;
let panelCantidades = {};

function precioPanelActual(){
  const medida = PANELES.medidas[panelMedida];
  const nombreEspesor = PANELES.espesores[panelEspesor];
  return medida.precios[nombreEspesor] ?? 0;
}

function htmlCalculadoraPaneles(){
  return `
    <div class="calc-paneles">
      <div class="calc-paneles-info">
        <h3>Elegí medida y espesor</h3>
        <p>Este precio aplica a cualquiera de los diseños en chapa que ves abajo.</p>
      </div>
      <div class="calc-paneles-selectores">
        <div>
          <label for="panel-sel-medida">Medida</label>
          <select id="panel-sel-medida" onchange="actualizarCalculadoraPaneles()">
            ${PANELES.medidas.map((m,i)=>`<option value="${i}" ${i===panelMedida?"selected":""}>${m.nombre}</option>`).join("")}
          </select>
        </div>
        <div>
          <label for="panel-sel-espesor">Espesor</label>
          <select id="panel-sel-espesor" onchange="actualizarCalculadoraPaneles()">
            ${PANELES.espesores.map((e,i)=>`<option value="${i}" ${i===panelEspesor?"selected":""}>${e}</option>`).join("")}
          </select>
        </div>
      </div>
      <div class="calc-paneles-precio">
        <small>Precio por panel</small>
        <b id="panel-precio-calc">${pesos(precioPanelActual())}</b>
      </div>
    </div>`;
}

function actualizarCalculadoraPaneles(){
  panelMedida = +document.getElementById("panel-sel-medida").value;
  panelEspesor = +document.getElementById("panel-sel-espesor").value;
  const precio = precioPanelActual();
  const elCalc = document.getElementById("panel-precio-calc");
  if (elCalc) elCalc.textContent = pesos(precio);
  document.querySelectorAll(".precio-panel-modelo").forEach(el => el.textContent = pesos(precio));
}

function tarjetaPanelSimplificada(p){
  const fotos = listaFotos(p);
  const cant = panelCantidades[p.id] || 1;
  return `
    <article class="pieza">
      <div class="pieza-visual" data-indice="0">
        ${fotos.length
          ? `<img src="${fotos[0]}" alt="${p.nombre}" loading="lazy" class="foto-activa" style="object-position:${p.posicion || 'center'}">`
          : dibujo(p.motivo, p.material)}
        ${fotos.length > 1 ? `
          <button class="flecha flecha-izq" aria-label="Foto anterior" onclick="event.stopPropagation();moverFoto(this,'${p.id}',-1)">&#8249;</button>
          <button class="flecha flecha-der" aria-label="Foto siguiente" onclick="event.stopPropagation();moverFoto(this,'${p.id}',1)">&#8250;</button>
          <div class="puntos">
            ${fotos.map((f,i)=>`<button class="punto ${i===0?'activo':''}" aria-label="Ver foto ${i+1} de ${p.nombre}" onclick="event.stopPropagation();cambiarFoto(this,'${p.id}',${i})"></button>`).join("")}
          </div>` : ""}
      </div>
      <div class="pieza-cuerpo">
        <h3>${p.nombre}</h3>
        <p class="pieza-desc">${p.desc}</p>
        <div class="pieza-opciones">
          <div class="pieza-pie">
            <span class="precio precio-panel-modelo">${pesos(precioPanelActual())}</span>
            <div class="cant">
              <button onclick="cambiarCantPanel('${p.id}',-1)" aria-label="Restar una unidad">−</button>
              <span id="cant-panel-num-${p.id}">${cant}</span>
              <button onclick="cambiarCantPanel('${p.id}',1)" aria-label="Sumar una unidad">+</button>
            </div>
          </div>
          <button class="btn-sumar" style="width:100%" id="btn-panel-${p.id}" onclick="seleccionarPanel('${p.id}')">Seleccionar</button>
        </div>
      </div>
    </article>`;
}

function cambiarCantPanel(id, delta){
  const actual = panelCantidades[id] || 1;
  const nuevo = Math.max(1, actual + delta);
  panelCantidades[id] = nuevo;
  const el = document.getElementById("cant-panel-num-" + id);
  if (el) el.textContent = nuevo;
}

function seleccionarPanel(id){
  const p = PRODUCTOS.find(x => x.id === id);
  const medida = PANELES.medidas[panelMedida];
  const nombreEspesor = PANELES.espesores[panelEspesor];
  const precio = precioPanelActual();
  const cant = panelCantidades[id] || 1;
  const clave = id + "::panel::" + panelMedida + "::" + panelEspesor;
  const yaEsta = carrito.find(l => l.clave === clave);

  if (yaEsta) yaEsta.cant += cant;
  else carrito.push({
    clave, id, nombre:p.nombre, material:p.material, motivo:p.motivo, foto:listaFotos(p)[0],
    medida:medida.nombre, espesor:nombreEspesor, precio, cant
  });

  panelCantidades[id] = 1;
  const num = document.getElementById("cant-panel-num-" + id);
  if (num) num.textContent = 1;

  const btn = document.getElementById("btn-panel-" + id);
  if (btn){
    btn.textContent = "Seleccionado";
    btn.classList.add("listo");
    setTimeout(() => { btn.textContent = "Seleccionar"; btn.classList.remove("listo"); }, 1300);
  }

  pintarCarrito();
}

function precioDe(p, indiceMedida, indiceEspesor){
  const espesores = espesoresDe(p);
  const nombreEspesor = espesores[indiceEspesor] || espesores[0];
  const medida = p.medidas[indiceMedida];
  if (medida.precios[nombreEspesor] === undefined){
    console.warn(`Falta el precio de "${nombreEspesor}" en la medida "${medida.nombre}" del producto "${p.id}"`);
    return 0;
  }
  return medida.precios[nombreEspesor];
}

function tarjetaGenerica(p){
  const fotos = listaFotos(p);
  const espesores = espesoresDe(p);
  return `
    <article class="pieza">
      <div class="pieza-visual ${p.material==='mdf'?'es-mdf':''}" data-indice="0">
        ${fotos.length
          ? `<img src="${fotos[0]}" alt="${p.nombre}" loading="lazy" class="foto-activa" style="object-position:${p.posicion || 'center'}">`
          : dibujo(p.motivo, p.material)}
        ${fotos.length > 1 ? `
          <button class="flecha flecha-izq" aria-label="Foto anterior" onclick="event.stopPropagation();moverFoto(this,'${p.id}',-1)">&#8249;</button>
          <button class="flecha flecha-der" aria-label="Foto siguiente" onclick="event.stopPropagation();moverFoto(this,'${p.id}',1)">&#8250;</button>
          <div class="puntos">
            ${fotos.map((f,i)=>`<button class="punto ${i===0?'activo':''}" aria-label="Ver foto ${i+1} de ${p.nombre}" onclick="event.stopPropagation();cambiarFoto(this,'${p.id}',${i})"></button>`).join("")}
          </div>` : ""}
        <span class="etiqueta-mat">${p.material === "mdf" ? "MDF" : "Chapa"}</span>
      </div>
      <div class="pieza-cuerpo">
        <h3>${p.nombre}</h3>
        <p class="pieza-desc">${p.desc}</p>
        <div class="pieza-opciones">
          <div class="pieza-selectores">
            <select id="sel-${p.id}" onchange="refrescarPrecio('${p.id}')" aria-label="Medida de ${p.nombre}">
              ${p.medidas.map((m,i)=>`<option value="${i}">${m.nombre}</option>`).join("")}
            </select>
            <select id="esp-${p.id}" onchange="refrescarPrecio('${p.id}')" aria-label="Espesor de ${p.nombre}">
              ${espesores.map((e,i)=>`<option value="${i}">${e}</option>`).join("")}
            </select>
          </div>
          <div class="pieza-pie">
            <span class="precio" id="precio-${p.id}">${pesos(precioDe(p,0,0))}</span>
            <button class="btn-sumar" id="btn-${p.id}" onclick="sumar('${p.id}')">Agregar</button>
          </div>
        </div>
      </div>
    </article>`;
}

function refrescarPrecio(id){
  const p = PRODUCTOS.find(x => x.id === id);
  const iMedida = +document.getElementById("sel-" + id).value;
  const iEspesor = +document.getElementById("esp-" + id).value;
  document.getElementById("precio-" + id).textContent = pesos(precioDe(p, iMedida, iEspesor));
}

function sumar(id){
  const p = PRODUCTOS.find(x => x.id === id);
  const iMedida = +document.getElementById("sel-" + id).value;
  const iEspesor = +document.getElementById("esp-" + id).value;
  const espesores = espesoresDe(p);
  const nombreEspesor = espesores[iEspesor] || espesores[0];
  const precio = precioDe(p, iMedida, iEspesor);
  const clave = id + "::" + iMedida + "::" + iEspesor;
  const yaEsta = carrito.find(l => l.clave === clave);

  if (yaEsta) yaEsta.cant++;
  else carrito.push({
    clave, id, nombre:p.nombre, material:p.material, motivo:p.motivo, foto:listaFotos(p)[0],
    medida:p.medidas[iMedida].nombre, espesor:nombreEspesor, precio, cant:1
  });

  const btn = document.getElementById("btn-" + id);
  btn.textContent = "Agregado";
  btn.classList.add("listo");
  setTimeout(() => { btn.textContent = "Agregar"; btn.classList.remove("listo"); }, 1300);

  pintarCarrito();
}

function pintarGrilla(){
  const lista = PRODUCTOS.filter(p => filtroActivo === "todos" || p.cat === filtroActivo);
  const contenedorCalc = document.getElementById("grilla-calc");

  if (filtroActivo === "paneles"){
    const panelesChapa = lista.filter(p => p.material === "chapa");
    const otros = lista.filter(p => p.material !== "chapa");

    contenedorCalc.innerHTML = htmlCalculadoraPaneles();
    document.getElementById("grilla").innerHTML =
      panelesChapa.map(tarjetaPanelSimplificada).join("") +
      otros.map(tarjetaGenerica).join("");
  } else {
    contenedorCalc.innerHTML = "";
    document.getElementById("grilla").innerHTML = lista.map(tarjetaGenerica).join("");
  }
}

function cambiarFoto(boton, id, indice){
  const p = PRODUCTOS.find(x => x.id === id);
  const fotos = listaFotos(p);
  const visual = boton.closest(".pieza-visual");
  visual.dataset.indice = indice;
  visual.querySelector(".foto-activa").src = fotos[indice];
  visual.querySelectorAll(".punto").forEach((b,i) => b.classList.toggle("activo", i === indice));
}

function moverFoto(boton, id, delta){
  const p = PRODUCTOS.find(x => x.id === id);
  const fotos = listaFotos(p);
  const visual = boton.closest(".pieza-visual");
  const actual = +visual.dataset.indice;
  const nuevo = (actual + delta + fotos.length) % fotos.length;
  cambiarFoto(boton, id, nuevo);
}

function cambiarCant(clave, delta){
  const l = carrito.find(x => x.clave === clave);
  if (!l) return;
  l.cant += delta;
  if (l.cant < 1) carrito = carrito.filter(x => x.clave !== clave);
  pintarCarrito();
}

function quitar(clave){
  carrito = carrito.filter(x => x.clave !== clave);
  pintarCarrito();
}

function totalPedido(){
  return carrito.reduce((s,l) => s + l.precio * l.cant, 0);
}

function pintarCarrito(){
  const unidades = carrito.reduce((s,l) => s + l.cant, 0);
  document.getElementById("globo").textContent = unidades;
  document.getElementById("total").textContent = pesos(totalPedido());

  const caja = document.getElementById("cajon-lista");
  if (!carrito.length){
    caja.innerHTML = `<div class="vacio"><b>Todavía no elegiste nada</b>
      Sumá piezas del catálogo y las vas a ver acá.</div>`;
    return;
  }
  caja.innerHTML = carrito.map(l => `
    <div class="linea">
      <div class="linea-mini ${l.material==='mdf'?'es-mdf':''}">${l.foto
        ? `<img src="${l.foto}" alt="">`
        : dibujo(l.motivo,l.material)}</div>
      <div class="linea-info">
        <b>${l.nombre}</b>
        <small>${l.medida} · ${l.espesor} · ${l.material === "mdf" ? "MDF" : "Chapa"}</small>
        <div class="linea-abajo">
          <div class="cant">
            <button onclick="cambiarCant('${l.clave}',-1)" aria-label="Quitar una unidad">−</button>
            <span>${l.cant}</span>
            <button onclick="cambiarCant('${l.clave}',1)" aria-label="Sumar una unidad">+</button>
          </div>
          <span class="precio" style="font-size:1rem">${pesos(l.precio * l.cant)}</span>
        </div>
        <button class="quitar" onclick="quitar('${l.clave}')">Quitar del pedido</button>
      </div>
    </div>`).join("");
}

function abrirCarrito(){
  document.getElementById("cajon").classList.add("abierto");
  document.getElementById("velo").classList.add("abierto");
}
function cerrarCarrito(){
  document.getElementById("cajon").classList.remove("abierto");
  document.getElementById("velo").classList.remove("abierto");
}
document.addEventListener("keydown", e => { if (e.key === "Escape") cerrarCarrito(); });

function pedirPorWhatsApp(){
  if (!carrito.length){
    alert("Elegí al menos una pieza del catálogo antes de enviar el pedido.");
    return;
  }
  const detalle = carrito.map(l =>
    `• ${l.cant}× ${l.nombre} — ${l.medida}, espesor ${l.espesor} (${l.material === "mdf" ? "MDF" : "Chapa"}) — ${pesos(l.precio * l.cant)}`
  ).join("\n");

  const texto =
`Hola Tridente Metal, quiero hacer este pedido:

${detalle}

Total estimado: ${pesos(totalPedido())}

Mi nombre:
Localidad para el envío:`;

  window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(texto), "_blank");
}

document.getElementById("anio").textContent = new Date().getFullYear();
pintarGrilla();
pintarCarrito();