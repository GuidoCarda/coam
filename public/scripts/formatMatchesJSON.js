import matches from '../matches.json' assert {type: "json"}
import teamsv2 from '../teamsv2.json' assert {type: "json"}
import {open} from 'node:fs/promises'

//Formatear información general
matches.forEach((match, i) => {
  let stadium = match.stats?.stadium
  match.stadium = stadium
  delete match.stats
  let teamDataHome = match.team_data.home
  let teamDataAway = match.team_data.away
  match.team_data = [teamDataHome, teamDataAway]
  match.team_data = [teamDataHome, teamDataAway]
})

//Formatear team_data
matches.filter(match => match.team_data[0].score !== '').forEach((match, i) => {
    let idTeamHome = teamsv2.filter(team => team.teamRef === match.team_data[0].teamref)[0].id
    let idTeamAway = teamsv2.filter(team => team.teamRef === match.team_data[1].teamref)[0].id
    match.team_data[0].team_id = idTeamHome
    match.team_data[1].team_id = idTeamAway
  })


const matchesBuffer = Buffer.from(JSON.stringify(matches));

let filehandle = null;
try {
  filehandle = await open("../matches.json", "r+"); //Abrir archivo para modificar
  await filehandle.truncate(0); //Eliminar datos anteriores
  await filehandle.writeFile(matchesBuffer); //Escribir datos modificados
} finally {
  await filehandle?.close();
}
