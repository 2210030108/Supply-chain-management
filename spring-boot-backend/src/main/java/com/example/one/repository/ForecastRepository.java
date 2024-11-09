package com.example.one.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.one.model.Forecast;

public interface ForecastRepository extends JpaRepository<Forecast, Integer> {
    // You can add custom query methods here if needed
}

