const WHATSAPP = "5491123119414";

const ESPESORES = {
  chapa: ["0,9 mm", "1,2 mm","1,6 mm", "2 mm", "2,5 mm", "3 mm"]
};

const PANELES = {
  medidas: [
    { nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
    { nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
    { nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    { nombre:'600 × 2400 mm',  precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }}
  ],
  espesores: ESPESORES.chapa
};

const PRODUCTOS = [
  {
    id:"panel-ramas", cat:"paneles", nombre:"Panel Ramas",
    desc:"Follaje entrelazado, nuestro diseño más pedido. Queda impecable detrás del sillón o en la galería.",
    material:"chapa", motivo:"ramas",
    fotos: ["img/panel-ramas-1.jpg", "img/panel-ramas-2.jpg", "img/panel-ramas-3.jpg"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm',  precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"panel-hojas", cat:"paneles", nombre:"Panel Hojas",
    desc:"Líneas continuas que generan movimiento. Ideal para pasillos largos y paredes angostas.",
    material:"chapa", motivo:"ondas",
    fotos: ["img/panel-hojas-1.jpg", "img/panel-ondas-2.jpg", "img/panel-ondas-3.jpg"],
    medidas:[
      {nombre:'600 × 1200 mm',  precios:{ '0,9 mm':36000, '1,2 mm':49000, '1,6 mm':62000, '2 mm':69000, '2,5 mm':91000, '3 mm':104000 }},
      {nombre:'1200 × 1200 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'600 × 2400 mm', precios:{ '0,9 mm':66000, '1,2 mm':90000, '1,6 mm':114000, '2 mm':126000, '2,5 mm':168000, '3 mm':192000 }},
      {nombre:'1200 × 2400 mm', precios:{ '0,9 mm':121000,'1,2 mm':165000,'1,6 mm':209000, '2 mm':231000, '2,5 mm':308000, '3 mm':352000 }},
    ]
  },
  {
    id:"divisor-bambu", cat:"paneles", nombre:"Divisor Bambú",
    desc:"Panel alto para separar ambientes sin cerrar la luz. Se entrega con anclajes a piso y techo.",
    material:"chapa", motivo:"bambu",
    medidas:[
      {nombre:'180 × 90 cm', precios:{ '0,9 mm':158000,'1,2 mm':177000,'2 mm':202000,'3 mm':229000 }},
      {nombre:'220 × 90 cm', precios:{ '0,9 mm':189000,'1,2 mm':212000,'2 mm':242000,'3 mm':274000 }}
    ]
  },
  {
    id:"escudo-club", cat:"escudos", nombre:"Escudo de tu club",
    desc:"Cortado a partir del escudo oficial, en el color que elijas. Decinos cuál en el pedido.",
    material:"chapa", motivo:"escudo",
    medidas:[
      {nombre:'30 cm de alto', precios:{ '0,9 mm':21000, '1,2 mm':23500, '2 mm':27000, '3 mm':30500 }},
      {nombre:'45 cm de alto', precios:{ '0,9 mm':33000, '1,2 mm':37000, '2 mm':42000, '3 mm':48000 }},
      {nombre:'60 cm de alto', precios:{ '0,9 mm':48000, '1,2 mm':54000, '2 mm':61000, '3 mm':70000 }}
    ]
  },
  {
    id:"escudo-luz", cat:"escudos", nombre:"Escudo retroiluminado",
    desc:"Mismo corte, montado sobre base con tira LED cálida. Se enchufa a 220 V y trae ficha.",
    material:"chapa", motivo:"escudo",
    medidas:[
      {nombre:'40 cm de alto', precios:{ '0,9 mm':52000, '1,2 mm':58000, '2 mm':67000, '3 mm':75000 }},
      {nombre:'55 cm de alto', precios:{ '0,9 mm':71000, '1,2 mm':80000, '2 mm':91000, '3 mm':103000 }}
    ]
  },
  {
    id:"parrilla-v", cat:"parrillas", nombre:"Parrilla en V",
    desc:"Hierros en V con canaleta recolectora de grasa. Incluye asador y regulación de altura.",
    material:"chapa", motivo:"parrilla",
    medidas:[
      {nombre:'80 cm de ancho',  precios:{ '0,9 mm':168000,'1,2 mm':188000,'2 mm':215000,'3 mm':244000 }},
      {nombre:'100 cm de ancho', precios:{ '0,9 mm':205000,'1,2 mm':230000,'2 mm':262000,'3 mm':297000 }},
      {nombre:'120 cm de ancho', precios:{ '0,9 mm':248000,'1,2 mm':278000,'2 mm':317000,'3 mm':360000 }}
    ]
  },
  {
    id:"tapa-disco", cat:"parrillas", nombre:"Tapa de disco calada",
    desc:"Tapa con calado decorativo y manija de hierro macizo. Entra en discos de arado estándar.",
    material:"chapa", motivo:"disco",
    medidas:[
      {nombre:'Disco de 40 cm', precios:{ '0,9 mm':38000, '1,2 mm':43000, '2 mm':49000, '3 mm':55000 }},
      {nombre:'Disco de 50 cm', precios:{ '0,9 mm':47000, '1,2 mm':53000, '2 mm':60000, '3 mm':68000 }}
    ]
  },
  {
    id:"numeros-casa", cat:"hogar", nombre:"Número de casa",
    desc:"Dígitos en chapa de 3 mm con separadores para que proyecten sombra sobre la pared.",
    material:"chapa", motivo:"numero",
    medidas:[
      {nombre:'15 cm de alto (por dígito)', precios:{ '0,9 mm':8500,  '1,2 mm':9500,  '2 mm':11000, '3 mm':12500 }},
      {nombre:'25 cm de alto (por dígito)', precios:{ '0,9 mm':13500, '1,2 mm':15000, '2 mm':17500, '3 mm':19500 }}
    ]
  },
  {
    id:"perchero", cat:"hogar", nombre:"Perchero de pared",
    desc:"Placa calada con cinco ganchos rebatibles. Viene con tarugos y tornillos.",
    material:"chapa", motivo:"perchero",
    medidas:[
      {nombre:'50 × 15 cm', precios:{ '0,9 mm':26000, '1,2 mm':29000, '2 mm':33000, '3 mm':38000 }},
      {nombre:'80 × 15 cm', precios:{ '0,9 mm':37000, '1,2 mm':41000, '2 mm':47000, '3 mm':54000 }}
    ]
  }
];

const CATEGORIAS = [
  {id:"todos",     nombre:"Todo el catálogo"},
  {id:"paneles",   nombre:"Paneles decorativos"},
  {id:"escudos",   nombre:"Escudos"},
  {id:"parrillas", nombre:"Parrillas"},
  {id:"hogar",     nombre:"Hogar"}
];