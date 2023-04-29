
// Creamos un array de objetos con algunas personas
const personas = [
    { nombre: "Juan", edad: 25 },
    { nombre: "María", edad: 30 },
    { nombre: "Pedro", edad: 20 },
    { nombre: "Ana", edad: 27 },
    { nombre: "Luis", edad: 35 },
    { nombre: "Sofía", edad: 18 },
  ];
  
  // Pedimos al usuario que introduzca el nombre a buscar
  const busqueda = prompt("Introduce el nombre a buscar:");
  
  // Utilizamos la función find para buscar la persona en el array
  const resultado = personas.find(persona => persona.nombre === busqueda);
  
  // Creamos una tabla con el resultado de la búsqueda
  console.table([{ "Nombre buscado": busqueda, "Resultado": resultado }]);