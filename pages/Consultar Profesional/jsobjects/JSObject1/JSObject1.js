export default {
	mostrarModalEliminar (row) {
		storeValue("registroEliminar", row.id);
		showModal("ModalEliminar");
	}
}