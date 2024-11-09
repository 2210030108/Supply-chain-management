package com.example.one.model;


import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "forecasts")
public class Forecast {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ForecastID")
    private Integer forecastId;

    @ManyToOne
    @JoinColumn(name = "ProductID", nullable = false)
    private Product product;  // Assuming Product is a mapped entity

    @Column(name = "ForecastDate", nullable = false)
    private Date forecastDate;

    @Column(name = "ForecastedQuantity", nullable = false)
    private Integer forecastedQuantity;

    // Getters and Setters
    public Integer getForecastId() {
        return forecastId;
    }

    public void setForecastId(Integer forecastId) {
        this.forecastId = forecastId;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Date getForecastDate() {
        return forecastDate;
    }

    public void setForecastDate(Date forecastDate) {
        this.forecastDate = forecastDate;
    }

    public Integer getForecastedQuantity() {
        return forecastedQuantity;
    }

    public void setForecastedQuantity(Integer forecastedQuantity) {
        this.forecastedQuantity = forecastedQuantity;
    }
}

