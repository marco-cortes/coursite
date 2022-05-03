package com.makeitweb.coursiteapi;

import org.springframework.context.annotation.Bean;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


@SpringBootApplication
public class CoursiteApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(CoursiteApiApplication.class, args);
	}

	@Bean
	PasswordEncoder passwordEncoder(){
		return new BCryptPasswordEncoder();
	}

	/* *
	@Bean
	CommandLineRunner run(CategoryRepository cr, RoleRepository rr){
		return args -> {
			Category aux = new Category();
			aux.setName("TECHNOLOGY");
			cr.save(aux);
			aux = new Category();
			aux.setName("SCIENCE");
			cr.save(aux);
			//define categories

			Role role = new Role();
			role.setName("ROLE_USER");
			rr.save(role);

			role = new Role();
			role.setName(("ROLE_TEACHER"));
			rr.save(role);

			role = new Role();
			role.setName("ROLE_ADMIN");
			rr.save(role);
		};
	}
	 */
}
