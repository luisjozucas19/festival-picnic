const PIXELS_PER_MINUTE = 1.5;

const stagesData = [

{
stage:"Stage Picnic",
color:"purple",
shows:[
{artist:"Shel Dixon",time:"2:00PM - 2:30PM"},
{artist:"Jerry Di",time:"3:00PM - 3:30PM"},
{artist:"Kapo",time:"4:00PM - 4:50PM"},
{artist:"Yandel",time:"5:15PM - 6:15PM"},
{artist:"Young Miko",time:"6:45PM - 7:30PM"},
{artist:"Ozuna",time:"7:50PM - 8:50PM"}
]
},

{
stage:"Stage Jogo",
color:"orange",
shows:[
{artist:"Alpha Blondy",time:"4:00PM - 5:15PM"},
{artist:"Tarrus Riley",time:"5:45PM - 6:45PM"},
{artist:"Koffee",time:"7:15PM - 8:15PM"},
{artist:"Tyga",time:"8:45PM - 9:45PM"}
]
},

{
stage:"Stage Hideout",
color:"blue",
shows:[
{artist:"Diego C",time:"3:00PM - 5:00PM"},
{artist:"Aria Vega",time:"6:10PM - 6:40PM"},
{artist:"Jessi G",time:"6:50PM - 7:30PM"},
{artist:"Lasso",time:"9:00PM - 9:40PM"}
]
}

];

const stages=document.getElementById("stages");
const schedule=document.getElementById("schedule");
const hours=document.getElementById("hours");

let myShows = [];

function toMinutes(t){

let [time,ampm]=t.split(/(AM|PM)/);
let [h,m]=time.split(":").map(Number);

if(ampm==="PM" && h!==12)h+=12;

return h*60+m;

}

function parseRange(range){

let p=range.split("-");

return{
start:toMinutes(p[0].trim()),
end:toMinutes(p[1].trim())
};

}

function addShow(show,color){

let times=parseRange(show.time);

myShows.push({
artist:show.artist,
start:times.start,
end:times.end,
time:show.time,
color:color
});

render();

}

function removeShow(i){

myShows.splice(i,1);
render();

}

function render(){

schedule.innerHTML="";

let columns=[];

myShows.forEach((s,i)=>{

let placed=false;

for(let c=0;c<columns.length;c++){

if(columns[c].every(e=>e.end<=s.start || e.start>=s.end)){

columns[c].push(s);
drawBlock(s,i,c);
placed=true;
break;

}

}

if(!placed){

columns.push([s]);
drawBlock(s,i,columns.length-1);

}

});

}

function drawBlock(s,i,column){

let duration=s.end-s.start;

let div=document.createElement("div");

div.className="block "+s.color;

div.style.top=(s.start*PIXELS_PER_MINUTE)+"px";
div.style.height=(duration*PIXELS_PER_MINUTE)+"px";
div.style.left=(column*130)+"px";

div.innerHTML=`
<strong>${s.artist}</strong><br>
${s.time}
<button onclick="removeShow(${i})">x</button>
`;

schedule.appendChild(div);

}

function createHours(){

for(let h=12;h<=24;h++){

let div=document.createElement("div");

div.className="hour";

div.style.top=(h*60*PIXELS_PER_MINUTE)+"px";

let hour=(h>12?h-12:h);
let ampm=h>=12?"PM":"AM";

div.innerText=hour+":00 "+ampm;

hours.appendChild(div);

}

}

stagesData.forEach(stage=>{

let div=document.createElement("div");

div.className="stage";

div.innerHTML=`<h3>${stage.stage}</h3>`;

stage.shows.forEach(show=>{

let s=document.createElement("div");

s.className="show";

s.innerHTML=`<strong>${show.artist}</strong><br>${show.time}`;

s.onclick=()=>addShow(show,stage.color);

div.appendChild(s);

});

stages.appendChild(div);

});

createHours();
render();
