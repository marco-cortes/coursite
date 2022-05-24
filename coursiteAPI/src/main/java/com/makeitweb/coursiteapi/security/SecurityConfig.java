package com.makeitweb.coursiteapi.security;

import com.makeitweb.coursiteapi.filter.CustomAuthenticationFilter;
import com.makeitweb.coursiteapi.filter.CustomAuthorizationFilter;
import com.makeitweb.coursiteapi.util.Keys;
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

import java.util.ArrayList;
import java.util.List;

@Configuration @EnableWebSecurity @RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final Keys keys;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManagerBean(), keys);
        customAuthenticationFilter.setFilterProcessesUrl("/api/login");
        http.csrf().disable().
                sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().

                authorizeRequests().antMatchers("/**").permitAll().

                antMatchers(HttpMethod.GET, "/api/user/**").hasAnyAuthority("ROLE_USER").
                antMatchers(HttpMethod.POST, "/api/user/**").hasAnyAuthority("ROLE_USER").
                antMatchers(HttpMethod.PUT, "/api/user/**").hasAnyAuthority("ROLE_USER").
                antMatchers(HttpMethod.DELETE, "/api/user/**").hasAnyAuthority("ROLE_USER").

                antMatchers(HttpMethod.GET, "/api/teacher/**").hasAnyAuthority("ROLE_TEACHER").
                antMatchers(HttpMethod.POST, "/api/teacher/**").hasAnyAuthority("ROLE_TEACHER").
                antMatchers(HttpMethod.PUT, "/api/teacher/**").hasAnyAuthority("ROLE_TEACHER").
                antMatchers(HttpMethod.DELETE, "/api/teacher/**").hasAnyAuthority("ROLE_TEACHER").

                antMatchers(HttpMethod.GET, "/api/admin/**").hasAnyAuthority("ROLE_ADMIN").
                antMatchers(HttpMethod.POST, "/api/admin/**").hasAnyAuthority("ROLE_ADMIN").
                antMatchers(HttpMethod.PUT, "/api/admin/**").hasAnyAuthority("ROLE_ADMIN").
                antMatchers(HttpMethod.DELETE, "/api/admin/**").hasAnyAuthority("ROLE_ADMIN").

                anyRequest().authenticated().and().
                cors().configurationSource(corsConfigurationSource()).
                and().
                addFilter(customAuthenticationFilter).
                addFilterBefore(new CustomAuthorizationFilter(keys), UsernamePasswordAuthenticationFilter.class);

    }

    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        List<String> list = new ArrayList<>();
        list.add(HttpMethod.GET.name());
        list.add(HttpMethod.PUT.name());
        list.add(HttpMethod.POST.name());
        list.add(HttpMethod.DELETE.name());
        List<String> origins = new ArrayList<>();
        origins.add("http://localhost:3000");

        configuration.setAllowedMethods(list);
        configuration.setAllowedOrigins(origins);

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
