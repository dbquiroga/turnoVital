export default {
	async guardarProfesional() {
		try {

			if (!inp_nombre_prof.text?.trim()) {
				showAlert("⚠️ El nombre del profesional es obligatorio", "warning");
				return;
			}
			if (!inp_apellido.text?.trim()) {
				showAlert("⚠️ El apellido del profesional es obligatorio", "warning");
				return;
			}
			if(!inp_dni?.value || inp_dni.value <=0){
				showAlert("⚠️ El DNI es obligatorio", "warning")
				return;
			}
			if (!inp_email.text?.trim()) {
				showAlert("⚠️ El correo electrónico es obligatorio", "warning");
				return;
			}
			if (!inp_matricula.value || inp_matricula.value <= 0) {
				showAlert("⚠️ La matrícula es obligatoria", "warning");
				return;
			}
			if (!inp_telefono.text?.trim()) {
				showAlert("⚠️ El teléfono es obligatorio", "warning");
				return;
			}

			// Si los datos estan OK recien ahi ejecuta las queries en orden
			await crearDomicilio.run();
			// storeValue("domicilio_id", crearDomicilio.data[0].id);
			console.log("domicilio: ", crearDomicilio.data);


			await crearPersona.run();
			// storeValue("persona_id", crearPersona.data[0].id);
			console.log("persona: ", crearPersona.data);


			await crearProfesional.run();
			console.log("profesional: ", crearProfesional.data);


			showAlert("Profesional registrado con éxito ✅", "success");
		} catch (e) {
			showAlert("Error al registrar profesional ❌", "error");
			console.log(e);
		}
	}
}
