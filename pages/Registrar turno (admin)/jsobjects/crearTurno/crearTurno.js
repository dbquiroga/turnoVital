export default {
	async crear () {
		await crearTurnos.run({data: {
			"profesional_id": `${appsmith.URL.queryParams.id}`,
			"paciente_id": `${pacienteSelect.selectedOptionValue}`,
			"hora": `${horaSelect.selectedOptionValue}`,
			"fecha": `${diaSelect.selectedDate.split("T")[0]}`
		}})

		mostrarTurnos.run({id: appsmith.URL.queryParams.id})
	}
}