export default {
	profesionalId: null,
	lunesData: [],
	martesData: [],
	miercolesData: [],
	juevesData: [],
	viernesData: [],
	sabadoData: [],
	domingoData: [],
	setProfesionalId: (profesionalId) => {
		this.profesionalId = profesionalId
	},
	configuracionAgenda: [],
	async crear(data){
		try {
			await crearAgenda.run({
				...data
			})
			await mostrarAgenda.run();
		} catch (e) {
			showAlert("Error al crear ❌", "error");
			console.log(e);
		}
	},
	async actualizar(data){
		try {
			await actualizarAgenda.run({
				...data
			})
			await mostrarAgenda.run()
		}catch (e) {
			showAlert("Error al actualizar ❌", "error");
			console.log(e);
		}
	},
	async eliminar(id) {
		try {
			await eliminarAgenda.run({ id });
			//showAlert(`Profesional ${this.row.nombre} ${this.row.apellido} eliminado ✅`, "success");

			// 🔁 Refrescar la lista
			await mostrarAgenda.run();
		} catch (e) {
			showAlert("Error al eliminar ❌", "error");
			console.log(e);
		}
	},
	async estructuraData() {
		this.lunesData = mostrarAgenda.data.filter((agenda) => agenda.dia_semana == "lunes")
		this.martesData = mostrarAgenda.data.filter((agenda) => agenda.dia_semana == "martes")
		this.miercolesData = mostrarAgenda.data.filter((agenda) => agenda.dia_semana == "miercoles")
		this.juevesData = mostrarAgenda.data.filter((agenda) => agenda.dia_semana == "jueves")
		this.viernesData = mostrarAgenda.data.filter((agenda) => agenda.dia_semana == "viernes")
		this.sabadoData = mostrarAgenda.data.filter((agenda) => agenda.dia_semana == "sabado")
		this.domingoData = mostrarAgenda.data.filter((agenda) => agenda.dia_semana == "domingo")
	}
}

