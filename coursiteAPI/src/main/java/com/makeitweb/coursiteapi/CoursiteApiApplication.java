package com.makeitweb.coursiteapi;

import com.makeitweb.coursiteapi.entity.course.Category;
import com.makeitweb.coursiteapi.entity.users.Role;
import com.makeitweb.coursiteapi.repository.CategoryRepository;
import com.makeitweb.coursiteapi.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class CoursiteApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(CoursiteApiApplication.class, args);
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
