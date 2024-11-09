package com.example.one.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .cors() // Enable CORS
            .and()
            .authorizeRequests()
                // Allow specific API endpoints to be accessed without authentication
                .requestMatchers("/api/register", "/api/login").permitAll()
                
                // API Endpoints related to Orders
                .requestMatchers("/api/orders/**").permitAll()
                
                // API Endpoints related to Customers
                .requestMatchers("/api/customers/**").permitAll()
                
                // API Endpoints related to Products (Add here any paths for Products API)
                .requestMatchers("/api/products/**").permitAll()
                
                // API Endpoints related to Suppliers
                .requestMatchers("/api/suppliers/**").permitAll()
                
                // API Endpoints related to Purchase Orders and Details
                .requestMatchers("/api/purchaseOrders/**").permitAll()
                .requestMatchers("/api/purchaseOrderDetails/**").permitAll()
                
                // API Endpoints related to Production Planning
                .requestMatchers("/api/productionOrders/**").permitAll()
                .requestMatchers("/api/workOrders/**").permitAll()
                
                // API Endpoints related to Shipments
                .requestMatchers("/api/shipments/**").permitAll()
                .requestMatchers("/api/shipmentDetails/**").permitAll()
                
                // API Endpoints related to Forecasting
                .requestMatchers("/api/forecasts/**").permitAll()
                .requestMatchers("/api/historicalSales/**").permitAll()
                
                // API Endpoints related to Supplier Contracts and Performance
                .requestMatchers("/api/supplierContracts/**").permitAll()
                .requestMatchers("/api/supplierPerformance/**").permitAll()

                // Allow all other endpoints to be authenticated
                .anyRequest().authenticated()
            .and()
            .formLogin().disable(); // Disable form login

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // Adjust to your frontend's domain
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
