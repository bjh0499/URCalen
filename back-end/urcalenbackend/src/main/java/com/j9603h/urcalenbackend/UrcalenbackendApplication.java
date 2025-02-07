package com.j9603h.urcalenbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class UrcalenbackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(UrcalenbackendApplication.class, args);
	}

}
