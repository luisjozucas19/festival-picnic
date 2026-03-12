const PIXELS_MINUTO = 1.66; 
const HORA_CERO = 13 * 60; 

const datosFestival = [
{ stage: "Stage Picnic", color: "purple", col: "col-picnic", shows: [
{ artist: "Shel Dixon", time: "2:00PM - 2:30PM" },
{ artist: "Jerry Di", time: "3:00PM - 3:30PM" },
{ artist: "Kapo", time: "4:00PM - 4:50PM" },
{ artist: "Yandel", time: "5:15PM - 6:15PM" },
{ artist: "Young Miko", time: "6:45PM - 7:30PM" },
{ artist: "Ozuna", time: "7:50PM - 8:50PM" },
{ artist: "Maná", time: "9:15PM - 10:30PM" }
]},
{ stage: "Stage Jogo", color: "orange", col: "col-jogo", shows: [
{ artist: "Rising Sound", time: "1:00PM - 2:30PM" },
{ artist: "Fuerza Dread", time: "2:30PM - 3:30PM" },
{ artist: "Alpha Blondy", time: "4:00PM - 5:15PM" },
{ artist: "Tarrus Riley", time: "5:45PM - 6:45PM" },
{ artist: "Original Koffee", time: "7:15PM - 8:15PM" },
{ artist: "Tyga", time: "8:45PM - 9:45PM" }
]},
{ stage: "Stage Hideout", color: "lightblue", col: "col-hideout", shows: [
{ artist: "Diego C", time: "3:00PM - 5:00PM" },
{ artist: "4BES • Khriztian GC", time: "5:00PM - 6:00PM" },
{ artist: "Aria Vega", time: "6:10PM - 6:40PM" },
{ artist: "Jessi G", time: "6:50PM - 7:30PM" },
{ artist: "De La Rose", time: "7:30PM - 8:15PM" },
{ artist: "Lasso", time: "9:00PM - 9:40PM" },
{ artist: "Tokischa", time: "10:15PM - 11:00PM" },
{ artist: "Rels B", time: "11:30PM - 12:30MN" },
{ artist: "Kybba", time: "12:45MN - 1:45AM" }
]}
];

let misArtistas = [];

/* cargar horario guardado */

const guardado = localStorage.getItem("horarioPicnic");

if(guardado){
misArtistas = JSON.parse(guardado);
}

/* convertir hora a minutos */

function aMinutos(t) {

let m = t.match(/(\d+):(\d+)(PM|AM|MN)/);

let h = parseInt(m[1]);
let min = parseInt(m[2]);
let p = m[3];

if (p === "PM" && h !== 12) h += 12;
if (p === "MN") h = 24;
if (p === "AM") h = (h === 12) ? 24 : h + 24;

return h * 60 + min;
}

/* render */

function renderItinerario() {

const contenedor = document.getElementById("mySchedule");

contenedor.innerHTML = "";

misArtistas.forEach((s, i) => {

const top = (s.ini - HORA_CERO) * PIXELS_MINUTO;
const height = (s.fin - s.ini) * PIXELS_MINUTO;

const div = document.createElement("div");

div.className = `timelineBlock ${s.color} ${s.col}`;

div.style.top = top + "px";
div.style.height = (height - 4) + "px";

div.innerHTML =
`<div><b>${s.artist}</b><br>${s.time}</div>
<button class="btn-borrar" onclick="borrarArtista(${i})">X</button>`;

contenedor.appendChild(div);

});

/* guardar */

localStorage.setItem("horarioPicnic", JSON.stringify(misArtistas));
}

/* borrar */

function borrarArtista(i) {

misArtistas.splice(i, 1);

renderItinerario();
}

/* generar cartelera */

const grid = document.getElementById("stages");

datosFestival.forEach(st => {

let d = document.createElement("div");

d.className = `stage ${st.color}`;

d.innerHTML = `<h3>${st.stage}</h3>`;

st.shows.forEach(sh => {

let b = document.createElement("div");

b.className = "show";

b.innerHTML = `${sh.artist}<br>${sh.time}`;

b.onclick = () => {

let ini = aMinutos(sh.time.split("-")[0]);
let fin = aMinutos(sh.time.split("-")[1]);

if (!misArtistas.find(x => x.artist === sh.artist)) {

misArtistas.push({...sh, ini, fin, color: st.color, col: st.col});

renderItinerario();

} else {

alert("Este artista ya está en tu horario");

}

};

d.appendChild(b);

});

grid.appendChild(d);

});

/* mostrar horario guardado */

renderItinerario();
