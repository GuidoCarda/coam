import currMatches from '../matches.json' assert {type: "json"}
import teams from '../teamsv2.json' assert { type : "json"}
import {open} from 'node:fs/promises'

//Fetch matches from api by Copa America
const updatedMatches = await fetch('https://backend.copaamerica.com/api/stats').then(res => res.json()).then(data => data.matches)

//Filter by matches that are played and aren't played
const playedMatches = updatedMatches.filter(match => match.teamData.home.Score !== "")
const unPlayedMatches = updatedMatches.filter(match => match.period === "PreMatch")

//Initialize new matches Array
const newMatches = []

//Filter the current json of matches, if the match is played
currMatches.filter(currMatches => new Date(currMatches.date) < new Date()).forEach(currMatch => {

  //Find the match with the new information by matchId
  let played = playedMatches.find(match => match.matchId &&  match.matchId ===currMatch.matchId)

  //Update home stats
  currMatch.team_data[0].score = played?.teamData.home.Score || currMatch.team_data[0].score
  currMatch.team_data[0].team = played?.teamData.home.team || currMatch.team_data[0].team
  currMatch.team_data[0].teamref = played?.teamData.home.TeamRef || currMatch.team_data[0].teamref
  currMatch.team_data[0].team_id = teams.find(team => team.teamRef === played?.teamData.home.TeamRef)?.id

  //Update away stats
  currMatch.team_data[1].score = played?.teamData.away.Score || currMatch.team_data[1].score
  currMatch.team_data[1].team = played?.teamData.away.team || currMatch.team_data[1].team
  currMatch.team_data[1].teamref = played?.teamData.away.TeamRef || currMatch.team_data[1].teamref
  currMatch.team_data[1].team_id = teams.find(team => team.teamRef === played?.teamData.away.TeamRef)?.id || null

  //Add the updated match to new matches Array
  newMatches.push(currMatch)
})

//Filter the current json of matches, if the match isn't played yet
currMatches.filter(currMatches => new Date(currMatches.date) > new Date()).forEach(currMatch => {

  //Find the match with the new information by matchId
  let played = unPlayedMatches.find(match => match.matchId &&  match.matchId ===currMatch.matchId)
  
  //Update home stats
  currMatch.team_data[0].score = played?.teamData.home.Score || currMatch.team_data[0].score
  currMatch.team_data[0].team = played?.teamData.home.team || currMatch.team_data[0].team
  currMatch.team_data[0].teamref = played?.teamData.home.TeamRef || currMatch.team_data[0].teamref
  currMatch.team_data[0].team_id = teams.find(team => team.teamRef === played?.teamData.home.TeamRef)?.id || null
  
  //Update away stats
  currMatch.team_data[1].score = played?.teamData.away.Score || currMatch.team_data[1].score
  currMatch.team_data[1].team = played?.teamData.away.team || currMatch.team_data[1].team
  currMatch.team_data[1].teamref = played?.teamData.away.TeamRef || currMatch.team_data[1].teamref
  currMatch.team_data[1].team_id = teams.find(team => team.teamRef === played?.teamData.away.TeamRef)?.id || null

  //Add the updated match to new matches Array
  newMatches.push(currMatch)
})


const matchesBuffer = Buffer.from(JSON.stringify(newMatches));

let filehandle = null;
try {
  filehandle = await open("../matches.json", "r+"); //Abrir archivo para modificar
  await filehandle.truncate(0); //Eliminar datos anteriores
  await filehandle.writeFile(matchesBuffer); //Escribir datos modificados
} finally {
  await filehandle?.close();
}

