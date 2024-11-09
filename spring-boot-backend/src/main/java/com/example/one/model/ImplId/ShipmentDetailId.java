package com.example.one.model.ImplId;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ShipmentDetailId implements Serializable {

    @Column(name = "ShipmentID")
    private Long shipmentId;

    @Column(name = "ProductID")
    private Integer productId;

    

    // Constructor with shipmentId and productId
    public ShipmentDetailId(Long shipmentId, Integer productId) {
        this.shipmentId = shipmentId;
        this.productId = productId;
    }

    public ShipmentDetailId(Integer shipmentId2, Integer productId2) {
		// TODO Auto-generated constructor stub
	}

	// Getters and Setters
    public Long getShipmentId() {
        return shipmentId;
    }

    public void setShipmentId(Long shipmentId) {
        this.shipmentId = shipmentId;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    // Override equals() and hashCode() for composite key comparison
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ShipmentDetailId that = (ShipmentDetailId) o;
        return Objects.equals(shipmentId, that.shipmentId) &&
               Objects.equals(productId, that.productId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(shipmentId, productId);
    }
}
