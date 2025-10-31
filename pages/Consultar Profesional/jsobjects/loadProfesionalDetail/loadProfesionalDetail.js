export default {
	profesional: {},
	persona: {},
	domicilio: {},
	async loadData (profId) {
		try {
			console.log("LOAD DATA PROFESSIONAL")
			// 2) Profesional
			const profRows = await getProfesional.run({ id: profId });
			console.log("profRows ", profRows)
			const profesional = profRows?.[0];
			if (!profesional) {
				throw new Error("Profesional no encontrado");
			}
			this.profesional = profesional;

			const especialidadRows = await getEspecialidad.run({id: profesional.especialidad_id })
			const especialidad = especialidadRows[0]
			this.profesional.especialidad = especialidad

			// 3) Persona (usa persona_id que vino en profesional)
			const perRows = await getPersona.run({ id: profesional.persona_id });
			console.log("perRows ", perRows)
			const persona = perRows?.[0];
			if (!persona) {
				throw new Error("Persona no encontrada");
			}
			this.persona = persona

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
			this.domicilio = domicilio

			const ciudadRows = await getCiudad.run({ id: domicilio.ciudad_id });
			const ciudad = ciudadRows[0];

			this.domicilio.ciudad = ciudad;

			// 5) Devolver todo (opcional)
			return { profesional, persona, domicilio };
		} catch (e) {
			showAlert(`Error cargando datos: ${e.message}`, "error");
			throw e;
		}
	}
}