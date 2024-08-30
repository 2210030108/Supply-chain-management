package com.example.one.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.one.exception.ResourceNotFoundException;
import com.example.one.model.Product;
import com.example.one.model.Stock;
import com.example.one.model.Warehouse;
import com.example.one.repository.ProductRepository;
import com.example.one.repository.StockRepository;
import com.example.one.repository.WarehouseRepository;

import java.util.List;

@Service
public class InventoryService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private WarehouseRepository warehouseRepository;

    // Product-related methods
    @Transactional
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    @Transactional
    public Product updateProduct(Long id, Product productDetails) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setCategory(productDetails.getCategory());
        product.setUnitOfMeasure(productDetails.getUnitOfMeasure());
        return productRepository.save(product);
    }

    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        productRepository.delete(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Stock-related methods
    @Transactional
    public Stock addStock(Stock stock) {
        return stockRepository.save(stock);
    }

    public Stock getStockById(Stock.StockId id) {
        return stockRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Stock not found with id: " + id));
    }

    @Transactional
    public Stock updateStock(Stock.StockId id, Stock stockDetails) {
        Stock stock = stockRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Stock not found with id: " + id));
        stock.setQuantityOnHand(stockDetails.getQuantityOnHand());
        stock.setReorderLevel(stockDetails.getReorderLevel());
        return stockRepository.save(stock);
    }

    @Transactional
    public void deleteStock(Stock.StockId id) {
        Stock stock = stockRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Stock not found with id: " + id));
        stockRepository.delete(stock);
    }

    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    public List<Stock> getStocksByWarehouse(Long warehouseId) {
        return stockRepository.findByWarehouseId(warehouseId);
    }

    public List<Stock> getStocksByProduct(Long productId) {
        return stockRepository.findByProductId(productId);
    }

    public boolean isReorderRequired(Long productId) {
        List<Stock> stocks = stockRepository.findByProductId(productId);
        for (Stock stock : stocks) {
            if (stock.getQuantityOnHand() <= stock.getReorderLevel()) {
                return true;
            }
        }
        return false;
    }

    // Warehouse-related methods
    @Transactional
    public Warehouse createWarehouse(Warehouse warehouse) {
        return warehouseRepository.save(warehouse);
    }

    public Warehouse getWarehouseById(Long id) {
        return warehouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found with id: " + id));
    }

    @Transactional
    public Warehouse updateWarehouse(Long id, Warehouse warehouseDetails) {
        Warehouse warehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found with id: " + id));
        warehouse.setLocation(warehouseDetails.getLocation());
        warehouse.setCapacity(warehouseDetails.getCapacity());
        warehouse.setManager(warehouseDetails.getManager());
        return warehouseRepository.save(warehouse);
    }

    @Transactional
    public void deleteWarehouse(Long id) {
        Warehouse warehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found with id: " + id));
        warehouseRepository.delete(warehouse);
    }

    public List<Warehouse> getAllWarehouses() {
        return warehouseRepository.findAll();
    }
}
