package com.itend.itendserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.itend.itendserver")
@EnableAutoConfiguration
public class ItendServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ItendServerApplication.class, args);
	}

}
