export default {
  generarHorarios() {
    const horarios = [];
    let hora = 8; // empieza a las 08:00

    while (hora < 24) {
      const hStr = hora.toString().padStart(2, "0") + ":00";
      horarios.push({
        name: hStr,
        code: hStr
      });
      hora++;
    }

    return horarios;
  }
};
