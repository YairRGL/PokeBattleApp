package com.yair.poke_api_mid;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class PokeApiMidApplication {

	public static void main(String[] args) {
		SpringApplication.run(PokeApiMidApplication.class, args);
	}

}
