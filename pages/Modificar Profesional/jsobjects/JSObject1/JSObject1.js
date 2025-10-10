export default {
	async loadCascade() {
		await clearStore('prof')
		await clearStore('persona')
		await clearStore('domicilio')
		
		try {
			// 1) id del profesional desde la URL, o lo que uses
			const profId = appsmith.URL.queryParams.id;
			if (!profId) {
				showAlert("Falta el parámetro id en la URL", "warning");
				return;
			}

			// 2) Profesional
			const profRows = await getProfesional.run({ id: profId });
			const profesional = profRows?.[0];
			if (!profesional) {
				throw new Error("Profesional no encontrado");
			}
			await storeValue("prof", profesional); // opcional para usar en inputs

			// 3) Persona (usa persona_id que vino en profesional)
			const perRows = await getPersona.run({ id: profesional.persona_id });
			const persona = perRows?.[0];
			if (!persona) {
				throw new Error("Persona no encontrada");
			}
			await storeValue("persona", persona);

			if (!persona.domicilio_id) {
				showAlert(`La persona ${persona.nombre} no tiene domicilio`, "error");
				return { profesional, persona };
			}

			// 4) Domicilio (usa domicilio_id de persona)
			const domRows = await getDomicilio.run({ id: persona.domicilio_id });
			const domicilio = domRows?.[0];
			if (!domicilio) {
				throw new Error("Domicilio no encontrado");
			}
			await storeValue("domicilio", domicilio);


			// 5) Devolver todo (opcional)
			return { profesional, persona, domicilio };
		} catch (e) {
			showAlert(`Error cargando datos: ${e.message}`, "error");
			throw e;
		}
	}
};
