package com.example.one.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.one.model.Forecast;
import com.example.one.service.ForecastService;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/forecasts")
public class ForecastController {

    @Autowired
    private ForecastService forecastService;

    // Create a new forecast
    @PostMapping
    public Forecast createForecast(@RequestBody Forecast forecast) {
        return forecastService.createForecast(forecast);
    }

    // Get all forecasts
    @GetMapping
    public List<Forecast> getAllForecasts() {
        return forecastService.getAllForecasts();
    }

    // Get forecast by ID
    @GetMapping("/{forecastId}")
    public Optional<Forecast> getForecastById(@PathVariable Integer forecastId) {
        return forecastService.getForecastById(forecastId);
    }

    // Generate a forecast based on historical sales for a product
    @PostMapping("/generate")
    public Forecast generateForecast(@RequestParam Integer productId, @RequestParam String forecastDate) {
        Date date = java.sql.Date.valueOf(forecastDate);  // Convert string to Date
        return forecastService.generateForecastForProduct(productId, date);
    }
}

