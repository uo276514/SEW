package persona;

public class Persona {

	private String nombre;
	private String apellidos;
	private String comentarios;
	private String enlaceFoto;
	private String fechaNac;
	private String lugarNac;
	private String coordNac;
	private String lugarResi;
	private String coordResi;
	private Persona[] amigos;

	public Persona() {
		amigos = new Persona[3];
	}

	public String getNombre() {
		return nombre;
	}

	public String getApellidos() {
		return apellidos;
	}

	public String getComentarios() {
		return comentarios;
	}

	public String getEnlaceFoto() {
		return enlaceFoto;
	}

	public String getFechaNac() {
		return fechaNac;
	}

	public String getLugarNac() {
		return lugarNac;
	}

	public String getCoordNac() {
		return coordNac;
	}

	public String getLugarResi() {
		return lugarResi;
	}

	public String getCoordResi() {
		return coordResi;
	}

	public Persona[] getAmigos() {
		return amigos;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public void setComentarios(String comentarios) {
		this.comentarios = comentarios;
	}

	public void setEnlaceFoto(String enlaceFoto) {
		this.enlaceFoto = enlaceFoto;
	}

	public void setFechaNac(String fechaNac) {
		this.fechaNac = fechaNac;
	}

	public void setLugarNac(String lugarNac) {
		this.lugarNac = lugarNac;
	}

	public void setCoordNac(String coordNac) {
		this.coordNac = coordNac;
	}

	public void setLugarResi(String lugarResi) {
		this.lugarResi = lugarResi;
	}

	public void setCoordResi(String coordResi) {
		this.coordResi = coordResi;
	}

	public void addAmigo(Persona amigo) {
		if (amigos[0] == null)
			amigos[0] = amigo;
		else if (amigos[1] == null)
			amigos[1] = amigo;
		else if (amigos[2] == null)
			amigos[2] = amigo;
	}
	
	@Override
	public String toString() {
		if (amigos[0] != null && amigos[1] != null && amigos[2] != null)
			return  nombre + " " + apellidos + " - " + comentarios + "\n\t" 
					+ "Foto: " + enlaceFoto + "\n\tFecha de nacimiento: " + fechaNac + " - Lugar de nacimiento: " + lugarNac 
					+ " - Coordenadas de nacimiento: " + coordNac + "\n\tLugar de residencia: " + lugarResi 
					+ " - Coordenadas de residencia: " + coordResi
					+ "\n\tAmigos: " + amigos[0].getNombre() + ", " + amigos[1].getNombre() + ", " + amigos[2].getNombre();
		
		return  nombre + " " + apellidos + " - " + comentarios + "\n\t" 
				+ "Foto: " + enlaceFoto + "\n\tFecha de nacimiento: " + fechaNac + " - Lugar de nacimiento: " + lugarNac 
				+ " - Coordenadas de nacimiento: " + coordNac + "\n\tLugar de residencia: " + lugarResi 
				+ " - Coordenadas de residencia: " + coordResi;
	}
	
}
