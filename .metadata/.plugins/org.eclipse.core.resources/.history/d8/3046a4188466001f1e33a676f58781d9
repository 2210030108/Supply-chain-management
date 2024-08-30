package com.example.one.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.one.model.Stock;
import com.example.one.service.InventoryService;

@RestController
@RequestMapping("/api")
public class StockController {

    @Autowired
    private InventoryService inventoryService;

    @PostMapping("/stock")
    public ResponseEntity<Stock> createStock(@RequestBody Stock stock) {
        if (stock.getProductId() == null || stock.getWarehouseId() == null) {
            return ResponseEntity.badRequest().body(null);
        }
        Stock savedStock = inventoryService.addStock(stock);
        return ResponseEntity.ok(savedStock);
    }

    @GetMapping("/stock/{productId}/{warehouseId}")
    public ResponseEntity<Stock> getStock(@PathVariable Long productId, @PathVariable Long warehouseId) {
        Stock.StockId stockId = new Stock.StockId(productId, warehouseId);
        Stock stock = inventoryService.getStockById(stockId);
        return ResponseEntity.ok(stock);
    }

    @PutMapping("/stock/{productId}/{warehouseId}")
    public ResponseEntity<Stock> updateStock(
            @PathVariable Long productId,
            @PathVariable Long warehouseId,
            @RequestBody Stock stockDetails) {
        Stock.StockId stockId = new Stock.StockId(productId, warehouseId);
        Stock updatedStock = inventoryService.updateStock(stockId, stockDetails);
        return ResponseEntity.ok(updatedStock);
    }

    @DeleteMapping("/stock/{productId}/{warehouseId}")
    public ResponseEntity<Void> deleteStock(
            @PathVariable Long productId,
            @PathVariable Long warehouseId) {
        Stock.StockId stockId = new Stock.StockId(productId, warehouseId);
        inventoryService.deleteStock(stockId);
        return ResponseEntity.noContent().build();
    }
}
