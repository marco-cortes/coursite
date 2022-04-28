package com.makeitweb.coursiteapi.security;

import com.makeitweb.coursiteapi.filter.CustomAuthenticationFilter;
import com.makeitweb.coursiteapi.filter.CustomAuthorizationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration @EnableWebSecurity @RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManagerBean());
        customAuthenticationFilter.setFilterProcessesUrl("/api/login");
        http.csrf().disable().
                sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().

                authorizeRequests().antMatchers("/api/login/**",
                        "/api/token/refresh/**",
                        "/api/register").permitAll().
                antMatchers(HttpMethod.GET, "/api/course/*").permitAll().
                antMatchers(HttpMethod.GET, "/api/teacher/*").permitAll().

                antMatchers(HttpMethod.GET, "/api/user/**").hasAnyAuthority("ROLE_USER").
                antMatchers(HttpMethod.POST, "/api/user/**").hasAnyAuthority("ROLE_USER").
                antMatchers(HttpMethod.PUT, "/api/user/**").hasAnyAuthority("ROLE_USER").
                antMatchers(HttpMethod.DELETE, "/api/user/**").hasAnyAuthority("ROLE_USER").
                antMatchers(HttpMethod.GET, "/api/course/user/*").hasAnyAuthority("ROLE_USER").
                antMatchers(HttpMethod.GET, "/api/usercourse/*").hasAnyAuthority("ROLE_USER").
                antMatchers(HttpMethod.POST, "/api/usercourse/**").hasAnyAuthority("ROLE_USER").

                antMatchers(HttpMethod.POST, "/api/course/*").hasAnyAuthority("ROLE_TEACHER").
                antMatchers(HttpMethod.PUT, "/api/course/*").hasAnyAuthority("ROLE_TEACHER").
                antMatchers(HttpMethod.DELETE, "/api/course/*").hasAnyAuthority("ROLE_TEACHER").
                antMatchers(HttpMethod.POST, "/api/document/*").hasAnyAuthority("ROLE_TEACHER").
                antMatchers(HttpMethod.POST, "/api/lesson/*").hasAnyAuthority("ROLE_TEACHER").
                antMatchers(HttpMethod.DELETE, "/api/lesson/*").hasAnyAuthority("ROLE_TEACHER").
                antMatchers(HttpMethod.GET, "/api/unit/*").hasAnyAuthority("ROLE_TEACHER").
                antMatchers(HttpMethod.POST, "/api/unit/*").hasAnyAuthority("ROLE_TEACHER").
                antMatchers(HttpMethod.DELETE, "/api/unit/*").hasAnyAuthority("ROLE_TEACHER").
                antMatchers(HttpMethod.POST, "/api/teacher/*").hasAnyAuthority("ROLE_TEACHER").
                antMatchers(HttpMethod.PUT, "/api/teacher/*").hasAnyAuthority("ROLE_TEACHER").
                antMatchers(HttpMethod.DELETE, "/api/teacher/*").hasAnyAuthority("ROLE_TEACHER").

                antMatchers(HttpMethod.GET, "/api/admin/**").hasAnyAuthority("ROLE_ADMIN").
                antMatchers(HttpMethod.POST, "/api/admin/**").hasAnyAuthority("ROLE_ADMIN").
                antMatchers(HttpMethod.PUT, "/api/admin/**").hasAnyAuthority("ROLE_ADMIN").
                antMatchers(HttpMethod.DELETE, "/api/admin/**").hasAnyAuthority("ROLE_ADMIN").

                anyRequest().authenticated().and().
                cors().configurationSource(corsConfigurationSource()).
                and().
                addFilter(customAuthenticationFilter).
                addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);

    }

    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedMethods(List.of(
                HttpMethod.GET.name(),
                HttpMethod.PUT.name(),
                HttpMethod.POST.name(),
                HttpMethod.DELETE.name()
        ));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration.applyPermitDefaultValues());
        return source;
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception{
        return super.authenticationManagerBean();
    }
}
