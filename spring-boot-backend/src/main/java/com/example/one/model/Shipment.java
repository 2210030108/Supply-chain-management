package com.example.one.model;


import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "shipments")
public class Shipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ShipmentID")
    private Integer shipmentId;

    @ManyToOne
    @JoinColumn(name = "OrderID", nullable = false)
    private Order order;  // Assuming Order is a mapped entity

    @Column(name = "ShipDate", nullable = false)
    private Date shipDate;

    @Column(name = "Carrier", length = 255)
    private String carrier;

    @Column(name = "TrackingNumber", length = 255)
    private String trackingNumber;

    @OneToMany(mappedBy = "shipment", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ShipmentDetail> shipmentDetails;

    // Getters and Setters
    public Integer getShipmentId() {
        return shipmentId;
    }

    public void setShipmentId(Integer shipmentId) {
        this.shipmentId = shipmentId;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Date getShipDate() {
        return shipDate;
    }

    public void setShipDate(Date shipDate) {
        this.shipDate = shipDate;
    }

    public String getCarrier() {
        return carrier;
    }

    public void setCarrier(String carrier) {
        this.carrier = carrier;
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public void setTrackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

    public List<ShipmentDetail> getShipmentDetails() {
        return shipmentDetails;
    }

    public void setShipmentDetails(List<ShipmentDetail> shipmentDetails) {
        this.shipmentDetails = shipmentDetails;
    }
}

