package com.example.one.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.one.model.Forecast;
import com.example.one.model.HistoricalSales;
import com.example.one.model.Product;
import com.example.one.repository.ForecastRepository;
import com.example.one.repository.HistoricalSalesRepository;
import com.example.one.repository.ProductRepository;  // Add this import

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ForecastService {

    @Autowired
    private ForecastRepository forecastRepository;

    @Autowired
    private HistoricalSalesRepository historicalSalesRepository;

    @Autowired
    private ProductRepository productRepository;  // Inject the ProductRepository

    // Create a new forecast
    public Forecast createForecast(Forecast forecast) {
        return forecastRepository.save(forecast);
    }

    // Get all forecasts
    public List<Forecast> getAllForecasts() {
        return forecastRepository.findAll();
    }

    // Get forecast by ID
    public Optional<Forecast> getForecastById(Integer forecastId) {
        return forecastRepository.findById(forecastId);
    }

    // Get historical sales data for a product
    public List<HistoricalSales> getHistoricalSalesByProductId(Integer productId) {
        return historicalSalesRepository.findAll().stream()
                .filter(sale -> sale.getProduct().getId().equals(productId))
                .toList();
    }

    // Generate forecast based on historical sales data (basic example)
    public Forecast generateForecastForProduct(Integer productId, Date forecastDate) {
        List<HistoricalSales> salesData = getHistoricalSalesByProductId(productId);

        // Here we could implement forecasting logic like averaging past sales for the forecast
        int totalQuantitySold = salesData.stream().mapToInt(HistoricalSales::getQuantitySold).sum();
        int forecastedQuantity = totalQuantitySold / salesData.size();  // Simple average

        // Fetch product from the database by ID
        Optional<Product> productOpt = productRepository.findById(Long.valueOf(productId));  // Assuming product ID is Long
        if (!productOpt.isPresent()) {
            // Handle case when product is not found
            throw new RuntimeException("Product not found with ID: " + productId);
        }

        Product product = productOpt.get();

        Forecast forecast = new Forecast();
        forecast.setProduct(product);  // Set the actual product object
        forecast.setForecastDate(forecastDate);
        forecast.setForecastedQuantity(forecastedQuantity);

        return createForecast(forecast);
    }
}
 