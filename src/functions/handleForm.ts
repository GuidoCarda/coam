
const predictionsForm = document.querySelector("#form-votes");

predictionsForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  /*
    Aca hago una asercion de tipos / type assertion
    Esto lo que hace es indicarle a ts que 
    nosotros sabemos que el form va a tener elementos de este
    tipo y por lo tanto ts va a confiar en esto y no lo va a checkear.
    const foo = 'bar' as type   -> Type assertion
    Por otro lado si usara anotaciones de tipo / type anotation, ts 
    va a esperar que el contenido sea de ese tipo pero va a checkear e 
    indicar si encuentra alguna diferencia o error.
    const foo: type = 'bar'     ->  Type annotation
    */
  const form = e.target as HTMLFormElement;
  const elements = Array.from(form.elements) as HTMLInputElement[];

  const predictions = elements
    .filter(
      (input) =>
        !input.hasAttribute("data-played") &&
        input.type !== "button" &&
        input.type !== "submit" &&
        input.tagName !== "INPUT"
      // Aca me saco de encima todos los inputs q no nos interesan
      // como los botonnes o input tipo submit etc
    )
    .map((input) => ({
      value: input.value,
      team_id: input.id,
      // formatealo como te convenga y agrega la data q necesites
    }));

  console.log(predictions);
});