package com.example.Rently;

import com.fasterxml.jackson.databind.util.JSONPObject;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
@RestController
public class RentlyApplication {

	public static void main(String[] args) {
		SpringApplication.run(RentlyApplication.class, args);
	}

	@GetMapping("/hi")
	public Map<String, Object> hello()
	{
		Map<String,Object> toSend = new HashMap<String,Object>();
		toSend.put("message", "Hello World");

		return toSend;
	}

	@Bean
	 public RestTemplate restTemplate() {
		return new RestTemplate();
	}

	 private RestTemplate restTemplate;

//	@Bean
//	public CommandLineRunner run(RestTemplate restTemplate) {
//		return args -> {
//			getApi(restTemplate); // Wywołanie metody po uruchomieniu aplikacji
//		};
//	}

	 public void getApi(RestTemplate restTemplate){
		String url = "https://api.sampleapis.com/coffee/hot";
		System.out.println( restTemplate.getForObject(url, String.class));
	}



}
