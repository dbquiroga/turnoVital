export default {
	mostrarModalEliminar (row) {
		showModal("ModalEliminar");
		storeValue("registroEliminar", row.id);
	}
}