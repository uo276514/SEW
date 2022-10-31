package html;

import java.util.ArrayList;
import java.util.List;

import persona.Persona;

public class GeneradorHTML {
	
	private List<Persona> personas;
	private List<String> outLines = new ArrayList<>();

	public GeneradorHTML(List<Persona> personas) {
		this.personas = personas;
	}

	public List<String> formarHTML() {
		incluirCabecera();
		
		for (Persona persona : personas) {
			outLines.add("");
			outLines.add("\t<h2>" + persona.getNombre() + " " + persona.getApellidos() + "</h2>");
			
			outLines.add("\t\t<p>Comentarios: " + persona.getComentarios() + "</p>");
			outLines.add("\t\t<p>Fecha de nacimiento: " + persona.getFechaNac() + "</p>");
			outLines.add("\t\t<p>Lugar de nacimiento: " + persona.getLugarNac() + "</p>");
			outLines.add("\t\t<p>Coordenadas de nacimiento: " + persona.getCoordNac() + "</p>");
			outLines.add("\t\t<p>Lugar de residencia: " + persona.getLugarResi() + "</p>");
			outLines.add("\t\t<p>Coordenadas de residencia: " + persona.getCoordResi() + "</p>");
			
			if (persona.getAmigos()[0] != null) {
				outLines.add("\t\t<p>Amigo 1: " + persona.getAmigos()[0].getNombre() + " " + persona.getAmigos()[0].getApellidos() + "</p>");
				outLines.add("\t\t<p>Amigo 2: " + persona.getAmigos()[1].getNombre() + " " + persona.getAmigos()[1].getApellidos() + "</p>");
				outLines.add("\t\t<p>Amigo 3: " + persona.getAmigos()[2].getNombre() + " " + persona.getAmigos()[2].getApellidos() + "</p>");
			}
			
			outLines.add("\t\t<p>Imagen del amigo:</p>");
			outLines.add("\t\t<img src=\"" + persona.getEnlaceFoto() +  "\" alt=\" " + persona.getNombre() + "\" >");
		}
				
		outLines.add("");
		outLines.add("</body>");
		outLines.add("</html>");
		return outLines;
	}

	private void incluirCabecera() {
		
		outLines.add("<!DOCTYPE HTML>");
		outLines.add("<html lang=\"es\">");
		outLines.add("<head>");
		outLines.add("\t<meta charset=\"UTF-8\" >");
		outLines.add("\t<meta name =\"viewport\" content =\"width=device-width, initial scale=1.0\" >");
		outLines.add("\t<title>RED SOCIAL</title>");
		outLines.add("\t<link rel=\"stylesheet\" type=\"text/css\" href=\"amigos.css\" >");
		outLines.add("</head>");
		outLines.add("<body>");
		outLines.add("\t<h1>RED SOCIAL</h1>");
		
	}

	
}
