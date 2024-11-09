package com.example.one.model;

import com.example.one.model.ImplId.PurchaseOrderDetailsId;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "purchaseorderdetails")
@IdClass(PurchaseOrderDetailsId.class) // Use the composite key class
public class PurchaseOrderDetails {

    @Id
    @ManyToOne
    @JoinColumn(name = "PurchaseOrderID")
    private PurchaseOrder purchaseOrder; // This part is part of the composite key

    @Id
    @Column(name = "ProductID")
    private Integer productId; // This part is also part of the composite key

    @Column(name = "Quantity", nullable = false)
    private Integer quantity;

    @Column(name = "UnitPrice", nullable = false, precision = 10)
    private Double unitPrice;

    // Getters and setters
    public PurchaseOrder getPurchaseOrder() {
        return purchaseOrder;
    }

    public void setPurchaseOrder(PurchaseOrder purchaseOrder) {
        this.purchaseOrder = purchaseOrder;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }
}
