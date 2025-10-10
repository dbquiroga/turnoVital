export default {
	Button2onClick () {
		deleteRegistro.run();
		closeModal("ModalEliminar");
		mostrarProfesionales.run();
	}
}