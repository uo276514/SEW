package persona;

import java.util.ArrayList;
import java.util.List;

public class GeneradorPersonas {

	private List<String> lines = null;
	private List<Persona> personas = new ArrayList<>();

	public GeneradorPersonas(List<String> lines) {
		this.lines = lines;
	}

	public List<Persona> generate() {
		for (int i=2; i < lines.size()-1; i++) {
			String[] parts = lines.get(i).split("\t");

			parts = eliminarPartesVacias(parts);
			
			Persona p = new Persona();
			
			for (String part : parts) {
				part = part.substring(1, part.length()-1);

				List<String> partList = toList(part);
				String[] parts2 = partList.get(0).split(" ");
				
				switch (parts2[0]) {
				case "persona":					
					obtenerNomApCom(p, partList);
					break;
				case "fotos":
					obtenerFotos(p, partList);
					break;
				case "fechaNac":
					obtenerFechaNac(p, partList);
					break;
				case "lugarNac":
					obtenerLugarNac(p, partList);
					break;
				case "coordNac":
					obtenerCoordNac(p, partList);
					break;
				case "lugarResi":
					obtenerLugarResi(p, partList);
					break;
				case "coordResi":
					obtenerCoordResi(p, partList);
					break;
				}
			}
			
			if (p.getNombre() != null)
				personas.add(p);

		}

		asignarAmigos();
		
		return personas;
	}

	private void asignarAmigos() {		
//		for (int i=0; i < personas.size(); i++) {
//			if (i==0 || i==1 || i==2 || i==5 || i==8 || i==9 || i==12)
//				personas.get(i).setPadre(personas.get(i+1));
//			
//			if (i==0)
//				personas.get(i).setMadre(personas.get(i+8));
//			else if (i==1 || i==8)
//				personas.get(i).setMadre(personas.get(i+4));
//			else if (i==2 || i==5 || i==9 || i==12)
//				personas.get(i).setMadre(personas.get(i+2));
//		}
	}

	private void obtenerCoordResi(Persona p, List<String> partList) {
		String[] parts = partList.get(0).split("\"");

		p.setCoordResi(parts[1]);
	}

	private void obtenerLugarResi(Persona p, List<String> partList) {
		String[] parts = partList.get(0).split("\"");

		p.setLugarResi(parts[1]);
	}

	private void obtenerCoordNac(Persona p, List<String> partList) {
		String[] parts = partList.get(0).split("\"");

		p.setCoordNac(parts[1]);
	}

	private void obtenerLugarNac(Persona p, List<String> partList) {
		String[] parts = partList.get(0).split("\"");

		p.setLugarNac(parts[1]);
	}

	private void obtenerFechaNac(Persona p, List<String> partList) {
		String[] parts = partList.get(0).split("\"");

		p.setFechaNac(parts[1]);
	}

	private void obtenerFotos(Persona p, List<String> partList) {
		String[] parts = partList.get(0).split("\"");

		p.setEnlaceFoto(parts[1]);
	}

	private void obtenerNomApCom(Persona p, List<String> partList) {
		String[] parts = partList.get(0).split("\"");

		p.setNombre(parts[1]);
		p.setApellidos(parts[3]);
		p.setComentarios(parts[5]);	
	}

	private List<String> toList(String part) {
		List<String> ret = new ArrayList<>();
		ret.add(part);
		return ret;
	}

	private String[] eliminarPartesVacias(String[] parts) {
		List<String> partes = new ArrayList<>();

		for (int i=0; i < parts.length; i++) {
			if (!parts[i].strip().equals(""))				
				partes.add(parts[i]);			
		}

		String[] partesArray = new String[partes.size()];

		for (int i=0; i < partes.size(); i++) {
			partesArray[i] = partes.get(i);
		}

		return partesArray;
	}
}
