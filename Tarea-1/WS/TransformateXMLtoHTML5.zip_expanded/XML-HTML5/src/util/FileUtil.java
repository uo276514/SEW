package util;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

/**
 * A utility class to read/write text lines from/to a text file
 */
public class FileUtil {

	public List<String> readLines(String inFileName) throws FileNotFoundException {
		List<String> res = new LinkedList<>();
		
		BufferedReader in = new BufferedReader(new FileReader(inFileName));
		
		try {
			String line;
			try {
				while ((line = in.readLine()) != null) {
					res.add(line);
				}
			} finally {
				in.close();
			}
		} catch (IOException ex) {
			throw new RuntimeException(ex);
		}
		return res;
	}

	public void writeLines(String outFileName, List<String> lines) {
		try {
			BufferedWriter out = new BufferedWriter(new FileWriter(outFileName));
			try {
				for (String line : lines) {
					out.write(line);
					out.newLine();
				}
			} finally {
				out.close();
			}
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

}
