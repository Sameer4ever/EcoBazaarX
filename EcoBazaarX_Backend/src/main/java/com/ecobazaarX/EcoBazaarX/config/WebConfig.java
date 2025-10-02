package com.ecobazaarX.EcoBazaarX.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**") // Target API endpoints specifically
                        .allowedOriginPatterns("http://localhost:3000") // ✅ allow frontend
                        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS") // include PATCH + OPTIONS
                        .allowedHeaders("*") // allow all headers
                        .allowCredentials(true); // allow cookies/credentials if needed
            }
        };
    }
}
