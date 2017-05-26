package com.newshored.prueba.controlles;

import java.util.ArrayList;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.newshored.prueba.models.RequestClient;

@Controller
@RequestMapping("/client")
public class ClientsController {
	
	@PostMapping("/searchClient")
	@ResponseBody
	public ArrayList<String> Upgrade(@RequestBody RequestClient datos){
		//return datos.toString();
		//System.out.println("{\"clients\":"+datos.toString()+"}");
		return datos.getRegistrado();
	}

}
