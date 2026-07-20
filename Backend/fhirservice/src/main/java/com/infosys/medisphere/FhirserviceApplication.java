package com.infosys.medisphere;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.kafka.annotation.EnableKafka;
@EnableFeignClients
@SpringBootApplication
@EnableKafka
public class FhirserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(FhirserviceApplication.class, args);
	}

}
