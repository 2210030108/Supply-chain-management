package com.example.one.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "stock")
@IdClass(Stock.StockId.class)
public class Stock {

    @Id
    @Column(name = "product_id")
    private Long productId;

    @Id
    @Column(name = "warehouse_id")
    private Long warehouseId;

    @Column(name = "quantity_on_hand")
    private int quantityOnHand;

    @Column(name = "reorder_level")
    private int reorderLevel;

    // Getters and Setters

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(Long warehouseId) {
        this.warehouseId = warehouseId;
    }

    public int getQuantityOnHand() {
        return quantityOnHand;
    }

    public void setQuantityOnHand(int quantityOnHand) {
        this.quantityOnHand = quantityOnHand;
    }

    public int getReorderLevel() {
        return reorderLevel;
    }

    public void setReorderLevel(int reorderLevel) {
        this.reorderLevel = reorderLevel;
    }

    // Composite Key Class
    public static class StockId implements Serializable {
        private Long productId;
        private Long warehouseId;

        // Default constructor
        public StockId() {
        }

        // Parameterized constructor
        public StockId(Long productId, Long warehouseId) {
            this.productId = productId;
            this.warehouseId = warehouseId;
        }

        // Getters and Setters
        public Long getProductId() {
            return productId;
        }

        public void setProductId(Long productId) {
            this.productId = productId;
        }

        public Long getWarehouseId() {
            return warehouseId;
        }

        public void setWarehouseId(Long warehouseId) {
            this.warehouseId = warehouseId;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            StockId stockId = (StockId) o;
            return Objects.equals(productId, stockId.productId) &&
                   Objects.equals(warehouseId, stockId.warehouseId);
        }

        @Override
        public int hashCode() {
            return Objects.hash(productId, warehouseId);
        }
    }
}
