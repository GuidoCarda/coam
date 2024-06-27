import players from '../../public/players.json' assert { type: "json" };
import teams from '../../public/teams.json' assert { type: "json" };


import { open } from 'node:fs/promises';

//Generar array de equipos
const TEAMS = []
teams.forEach(team => {
  TEAMS.push(team.name.toLowerCase().replace(' ','-'))//Formatear nombre ej = 'estados-unidos'
})

//Iterar players
players.forEach((team,teamIndex )=> {
  delete team.name
  delete team.flag
  delete team.acronym
  team.players.forEach((player, playerIndex) => {
    player.image = `https://copaamerica.com/_next/image?url=%2Fplayers%2F${TEAMS[teamIndex]}%2F${TEAMS[teamIndex]}-${playerIndex+1}.png&w=384&q=75`
    player.id = `${team.id}-${player.name.toLowerCase().replace(' ','')}-${playerIndex+1}`
  })
})

//Generar buffer de datos modificados
const playerBuff = Buffer.from(JSON.stringify(players))

let filehandle = null;
try {
  filehandle = await open('public/players.json', 'r+'); //Abrir archivo para modificar
  await filehandle.truncate(0); //Eliminar datos anteriores
  await filehandle.writeFile(playerBuff); //Escribir datos modificados
} finally {
  await filehandle?.close();
} 

