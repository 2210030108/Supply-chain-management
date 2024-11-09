package com.example.one.model;

import com.example.one.model.ImplId.ShipmentDetailId;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "shipmentdetails")
public class ShipmentDetail {

    // Use @EmbeddedId to represent the composite key
    @EmbeddedId
    private ShipmentDetailId id;

    @ManyToOne
    @JoinColumn(name = "ShipmentID", referencedColumnName = "ShipmentID", insertable = false, updatable = false)
    private Shipment shipment;

    @Column(name = "Quantity", nullable = false)
    private Integer quantity;

    @Column(name = "Destination", length = 255)
    private String destination;

    // Default constructor
    public ShipmentDetail() {}

    // Constructor to initialize the composite ID and other fields
    public ShipmentDetail(Shipment shipment, Integer productId, Integer quantity, String destination) {
        this.id = new ShipmentDetailId(shipment.getShipmentId(), productId); // Using the constructor with shipmentId and productId
        this.shipment = shipment;
        this.quantity = quantity;
        this.destination = destination;
    }

    // Getters and Setters
    public ShipmentDetailId getId() {
        return id;
    }

    public void setId(ShipmentDetailId id) {
        this.id = id;
    }

    public Shipment getShipment() {
        return shipment;
    }

    public void setShipment(Shipment shipment) {
        this.shipment = shipment;
    }

    public Integer getProductId() {
        return id != null ? id.getProductId() : null;
    }

    public void setProductId(Integer productId) {
        if (this.id == null) {
            this.id = new ShipmentDetailId(productId, productId);
        }
        this.id.setProductId(productId);
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }
}
