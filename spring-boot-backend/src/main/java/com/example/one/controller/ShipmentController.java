package com.example.one.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.one.model.Shipment;
import com.example.one.model.ShipmentDetail;
import com.example.one.service.ShipmentService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/shipments")
public class ShipmentController {

    @Autowired
    private ShipmentService shipmentService;

    // Create a new shipment
    @PostMapping
    public Shipment createShipment(@RequestBody Shipment shipment) {
        return shipmentService.createShipment(shipment);
    }

    // Get all shipments
    @GetMapping
    public List<Shipment> getAllShipments() {
        return shipmentService.getAllShipments();
    }

    // Get shipment by ID
    @GetMapping("/{shipmentId}")
    public Optional<Shipment> getShipmentById(@PathVariable Integer shipmentId) {
        return shipmentService.getShipmentById(shipmentId);
    }

    // Get shipment details by shipment ID
    @GetMapping("/{shipmentId}/details")
    public List<ShipmentDetail> getShipmentDetailsForShipment(@PathVariable Integer shipmentId) {
        return shipmentService.getShipmentDetailsForShipment(shipmentId);
    }

    // Create a shipment detail
    @PostMapping("/{shipmentId}/details")
    public ShipmentDetail createShipmentDetail(@PathVariable Integer shipmentId, @RequestBody ShipmentDetail shipmentDetail) {
        Shipment shipment = shipmentService.getShipmentById(shipmentId).orElse(null);
        if (shipment != null) {
            shipmentDetail.setShipment(shipment);
            return shipmentService.createShipmentDetail(shipmentDetail);
        }
        return null;
    }
}

