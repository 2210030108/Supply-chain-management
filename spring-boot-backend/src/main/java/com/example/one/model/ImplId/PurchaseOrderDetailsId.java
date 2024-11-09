package com.example.one.model.ImplId;

import java.io.Serializable;
import java.util.Objects;

import com.example.one.model.PurchaseOrder;

public class PurchaseOrderDetailsId implements Serializable {

    private PurchaseOrder purchaseOrder;
    private Integer productId;

    // Default constructor
    public PurchaseOrderDetailsId() {}

    // Constructor with fields
    public PurchaseOrderDetailsId(PurchaseOrder purchaseOrder, Integer productId) {
        this.purchaseOrder = purchaseOrder;
        this.productId = productId;
    }

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

    // Override equals() and hashCode() for proper key comparison
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PurchaseOrderDetailsId that = (PurchaseOrderDetailsId) o;
        return Objects.equals(purchaseOrder, that.purchaseOrder) &&
               Objects.equals(productId, that.productId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(purchaseOrder, productId);
    }
}
