export default {
	row: null,
	setRow: (row) => {
		this.row = row
	},
	async eliminar() {
		const id = this.row.profesional_id;
		if (!id) {
			showAlert("No hay profesional_id en la fila", "error");
			return;
		}

		try {
			await eliminarProfesional.run({ id });
			showAlert(`Profesional ${this.row.nombre} ${this.row.apellido} eliminado ✅`, "success");

			// 🔁 Refrescar la lista
			await mostrarProfesionales.run();
			closeModal(ModalEliminar.name);
		} catch (e) {
			showAlert("Error al eliminar ❌", "error");
			console.log(e);
		}
	}
}

