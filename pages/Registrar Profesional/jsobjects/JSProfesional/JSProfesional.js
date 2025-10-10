export default {
	async guardarProfesional() {
		try {
			await crearDomicilio.run();
			storeValue("domicilio_id", crearDomicilio.data[0].id);
			console.log(crearDomicilio.data);


			await crearPersona.run();
			storeValue("persona_id", crearPersona.data[0].id);
			console.log(crearPersona.data);


			await crearProfesional.run();
			console.log(crearProfesional.data);


			showAlert("Profesional registrado con éxito ✅", "success");
		} catch (e) {
			showAlert("Error al registrar profesional ❌", "error");
			console.log(e);
		}
	}
}
