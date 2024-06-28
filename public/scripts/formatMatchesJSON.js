import matches from '../matches.json' assert {type: "json"}
import teamsv2 from '../teamsv2.json' assert {type: "json"}
import { open } from 'node:fs/promises'


// matches.forEach((match, i) => {
//   let stadium = match.stats?.stadium
//   match.stadium = stadium
//   delete match.stats
//   let teamDataHome = match.team_data.home
//   let teamDataAway = match.team_data.away
//   match.team_data = [teamDataHome, teamDataAway]
// })

// matches.forEach((match, i) => {
//   match.team_data = [teamDataHome, teamDataAway]
// })
teamsv2.forEach(team =>
  matches.filter(match => match.team_data[0].teamref.includes(team.teamRef)).forEach((match, i) => {
    let idTeamHome = teamsv2.filter(team => team.teamRef === match.team_data[0].teamref)[0].id
    let idTeamAway = teamsv2.filter(team => team.teamRef === match.team_data[1].teamref)[0].id
    match.team_data[0].team_id = idTeamHome
    match.team_data[1].team_id = idTeamAway
    console.log(match.team_data)
  })
)
// console.log(match.team_data)

const matchesBuffer = Buffer.from(JSON.stringify(matches));

let filehandle = null;
try {
  filehandle = await open("../matches.json", "r+"); //Abrir archivo para modificar
  await filehandle.truncate(0); //Eliminar datos anteriores
  await filehandle.writeFile(matchesBuffer); //Escribir datos modificados
} finally {
  await filehandle?.close();
}
