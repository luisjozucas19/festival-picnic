const PIXELS_MINUTO = 1.66;
const HORA_CERO = 13 * 60;

const datosFestival = [

{ stage: "Stage Picnic", color: "purple", col: "col-picnic", shows: [
{ artist: "Tapón", time: "1:45PM - 2:15PM" },
{ artist: "Juan Duque", time: "2:45PM - 3:25PM" },
{ artist: "Lunay", time: "3:45PM - 4:25PM" },
{ artist: "Jhayco", time: "4:45PM - 5:45PM" },
{ artist: "Mora", time: "6:25PM - 7:20PM" },
{ artist: "Christina Aguilera", time: "8:00PM - 9:00PM" },
{ artist: "Christian Nodal", time: "9:30PM - 10:30PM" }
]},

{ stage: "Stage Jogo", color: "orange", col: "col-jogo", shows: [
{ artist: "Voodoo", time: "1:05PM - 1:45PM" },
{ artist: "Sonámbulo", time: "2:15PM - 3:15PM" },
{ artist: "Enanitos Verdes", time: "3:45PM - 4:45PM" },
{ artist: "Bomba Estéreo", time: "5:35PM - 6:35PM" },
{ artist: "Juanes", time: "7:00PM - 8:00PM" },
{ artist: "Simple Plan", time: "9:00PM - 10:00PM" }
]},

{ stage: "Stage Hideout", color: "lightblue", col: "col-hideout", shows: [
{ artist: "Sonia Sol", time: "1:00PM - 1:45PM" },
{ artist: "AZN-L", time: "1:45PM - 3:15PM" },
{ artist: "JOI", time: "3:30PM - 4:00PM" },
{ artist: "Orishas", time: "4:30PM - 5:15PM" },
{ artist: "Corina Smith", time: "5:40PM - 6:25PM" },
{ artist: "Clarent", time: "7:20PM - 8:00PM" },
{ artist: "Bryant Myers", time: "9:00PM - 9:45PM" },
{ artist: "Trueno", time: "11:00PM - 12:00MN" },
{ artist: "Danny Ocean", time: "12:30MN - 1:30AM" }
]}

];

let misArtistas = [];

function aMinutos(t){
let m = t.match(/(\d+):(\d+)(PM|AM|MN)/);
let h = parseInt(m[1]);
let min = parseInt(m[2]);
let p = m[3];

if (p === "PM" && h !== 12) h += 12;
if (p === "MN") h = 24;
if (p === "AM") h = (h === 12) ? 24 : h + 24;

return h * 60 + min;
}

function renderItinerario(){
const contenedor = document.getElementById("mySchedule");
contenedor.innerHTML = "";

misArtistas.forEach((s,i)=>{
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
}

function borrarArtista(i){
misArtistas.splice(i,1);
renderItinerario();
}

const grid = document.getElementById("stages");

datosFestival.forEach(st=>{
let d = document.createElement("div");
d.className = `stage ${st.color}`;
d.innerHTML = `<h3>${st.stage}</h3>`;

st.shows.forEach(sh=>{
let b = document.createElement("div");
b.className = "show";
b.innerHTML = `${sh.artist}<br>${sh.time}`;

b.onclick = ()=>{
let ini = aMinutos(sh.time.split("-")[0]);
let fin = aMinutos(sh.time.split("-")[1]);

if(!misArtistas.find(x=>x.artist===sh.artist)){
misArtistas.push({...sh,ini,fin,color:st.color,col:st.col});
renderItinerario();
}else{
alert("Este artista ya está en tu horario");
}
};

d.appendChild(b);
});

grid.appendChild(d);
});
