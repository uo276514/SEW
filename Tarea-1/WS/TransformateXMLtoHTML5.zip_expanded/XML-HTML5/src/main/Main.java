package main;

import java.io.FileNotFoundException;
import java.util.List;

import html.GeneradorHTML;
import persona.GeneradorPersonas;
import persona.Persona;
import util.FileUtil;

public class Main {

	private static final String xmlName = "amigos.xml";
	private static final String htmlName = "amigos.html";
	
	public static void main(String[] args) {
		new Main().transformate();
	}

	private void transformate() {
		try {
			FileUtil fu = new FileUtil();
			List<String> lines = fu.readLines( xmlName );
			GeneradorPersonas gen = new GeneradorPersonas(lines);
			List<Persona> personas = gen.generate();
			
			GeneradorHTML html = new GeneradorHTML(personas);
			List<String> outLines = html.formarHTML();
			
			fu.writeLines(htmlName, outLines);
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}
}
