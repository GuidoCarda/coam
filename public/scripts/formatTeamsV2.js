import teamsv2 from "../teamsv2.json" assert { type: "json" };
import teams from "../teams.json" assert { type: "json" };
import { open } from "node:fs/promises";


teamsv2.forEach((teamv2,index) => {
  teamv2.id = index +1
  teamv2.acronym = teams[index].acronym
  teamv2.image = teams[index].image
})
// console.log(teamsv2)

const teamsv2Buffer = Buffer.from(JSON.stringify(teamsv2));

let filehandle = null;
try {
  filehandle = await open("../teamsv2.json", "r+"); //Abrir archivo para modificar
  await filehandle.truncate(0); //Eliminar datos anteriores
  await filehandle.writeFile(teamsv2Buffer); //Escribir datos modificados
} finally {
  await filehandle?.close();
}
