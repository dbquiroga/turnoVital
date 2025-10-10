export default {
  async eliminarProfesional(row) {
    const id = row.profesional_id;
    if (!id) {
      showAlert("No hay profesional_id en la fila", "error");
      return;
    }

    try {
      await eliminarProfesional.run({ id });
      showAlert("Profesional eliminado ✅", "success");

      // 🔁 Refrescar la lista
      await mostrarProfesionales.run();
    } catch (e) {
      showAlert("Error al eliminar ❌", "error");
      console.log(e);
    }
  }
}
