class Servicio {
    static lastId = 0;
  
    constructor(nombre, precio) {
      this.id = ++Servicio.lastId;
      this.nombre = nombre;
      this.precio = precio;
    }
  }
  
  class Turno {
    constructor(nombre, especie, servicio, dueño, telefono) {
      this.nombre = nombre;
      this.especie = especie;
      this.servicio = servicio;
      this.dueño = dueño;
      this.telefono = telefono;
      this.hora = new Date();
    }
  
    obtenerHora() {
      return this.hora.toLocaleTimeString();
    }
  }
  
  let servicios = [
    new Servicio("Consulta", 500),
    new Servicio("Corte de pelo", 800),
    new Servicio("Vacunación", 600),
    new Servicio("Limpieza dental", 1200)
  ];
  
  let turnos = [];
  
  function agregarTurno() {
    let nombre = prompt("Ingrese el nombre de la mascota:");
    let especie = prompt("Ingrese la especie de la mascota:");
  
    let servicioPrompt = "Seleccione el servicio que desea:";
    servicios.forEach(s => {
      servicioPrompt += `\n${s.id}: ${s.nombre} - $${s.precio}`;
    });
    let servicioId = prompt(servicioPrompt);
    let servicio = servicios.find(s => s.id == servicioId);
    if (!servicio) {
      alert("El servicio ingresado no es válido.");
      return;
    }
  
    let dueño = prompt("Ingrese el nombre del dueño:");
    let telefono = prompt("Ingrese el número de teléfono:");
  
    let turno = new Turno(nombre, especie, servicio, dueño, telefono);
    turnos.push(turno);
  }
  
  function agregarServicio() {
    let nombre = prompt("Ingrese el nombre del servicio:");
    let precio = prompt("Ingrese el precio del servicio:");
    let servicio = new Servicio(nombre, precio);
    servicios.push(servicio);
    console.log(`El servicio ${nombre} ha sido agregado con éxito.`);
  }
  
  function calcularGananciaDiaria(fecha) {
    let ganancia = 0;
    turnos.forEach(t => {
      if (t.hora.toDateString() === fecha.toDateString()) {
        ganancia += t.servicio.precio;
      }
    });
    return ganancia;
  }
  
  function mostrarTurnos() {
    console.table(turnos);
  }
  
  function mostrarGananciaDiaria() {
    let fecha = new Date();
    let ganancia = calcularGananciaDiaria(fecha);
    console.table([{Fecha: fecha.toLocaleDateString(), Ganancia: ganancia}]);
  }
  
  let opcion;
  do {
    opcion = prompt("Seleccione una opción:\n1. Agregar turno\n2. Agregar servicio\n3. Mostrar turnos\n4. Mostrar ganancia diaria\n5. Salir");
    switch (opcion) {
      case "1":
        agregarTurno();
        break;
      case "2":
        agregarServicio();
        break;
      case "3":
        mostrarTurnos();
        break;
      case "4":
        mostrarGananciaDiaria();
        break;
      case "5":
        alert("¡Hasta luego!");
        break;
      default:
        alert("Opción inválida.");
        break;
    }
  } while (opcion != "5");
  
