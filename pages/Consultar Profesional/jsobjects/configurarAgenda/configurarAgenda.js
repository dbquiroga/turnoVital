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
	async refrescarInfo(){
		await mostrarAgenda.run().then(() => {
			this.estructuraData()
		});
	},
	async crear(diaSemana){
		try {
			console.log("DATA CREAR AGENDA ", diaSemana)
			await crearAgenda.run({
				"dia_semana": diaSemana,
				"hora_inicio": "08:00",
				"hora_fin": "18:00"
			})
			showAlert(`La configuracion para ${diaSemana} se creo con éxito ✅`, "success");
			this.refrescarInfo()
		} catch (e) {
			showAlert("Error al crear ❌", "error");
			console.log(e);
		}
	},
	async getDatabyDia(dia) {
		switch(dia) {
			case "lunes":
				return {
					"id": `${configurarAgenda.lunesData[0].id}`,
					"hora_inicio": `${lunesHoraInicio.selectedOptionValue}`,
					"hora_fin": `${lunesHoraFin.selectedOptionValue}`
				}
		}
	},
	async actualizar(dia){
		console.log("ACTUALIZAR DIA? ", dia)
		const data = await this.getDatabyDia(dia)
		console.log("ACTUALIZAR DATA ", data)
		try {
			await actualizarAgenda.run({
				...data
			})
			showAlert(`La configuracion para ${dia} se actualizo con éxito ✅`, "success");
			this.refrescarInfo()
		}catch (e) {
			showAlert("Error al actualizar ❌", "error");
			console.log(e);
		}
	},
	async eliminar(id) {
		try {
			await eliminarAgenda.run({ id });
			//showAlert(`Profesional ${this.row.nombre} ${this.row.apellido} eliminado ✅`, "success");

			showAlert(`La configuracion se elimino con éxito ✅`, "success");
			this.refrescarInfo()
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

