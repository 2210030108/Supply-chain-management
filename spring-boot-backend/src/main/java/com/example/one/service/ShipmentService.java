package com.example.one.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.one.model.Shipment;
import com.example.one.model.ShipmentDetail;
import com.example.one.repository.ShipmentDetailRepository;
import com.example.one.repository.ShipmentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ShipmentService {

    @Autowired
    private ShipmentRepository shipmentRepository;

    @Autowired
    private ShipmentDetailRepository shipmentDetailRepository;

    // Create a shipment with shipment details
    public Shipment createShipment(Shipment shipment) {
        return shipmentRepository.save(shipment);
    }

    // Get all shipments
    public List<Shipment> getAllShipments() {
        return shipmentRepository.findAll();
    }

    // Get shipment by ID
    public Optional<Shipment> getShipmentById(Integer shipmentId) {
        return shipmentRepository.findById(shipmentId);
    }

    // Get shipment details for a specific shipment
    public List<ShipmentDetail> getShipmentDetailsForShipment(Integer shipmentId) {
        return shipmentDetailRepository.findAll().stream()
                .filter(detail -> detail.getShipment().getShipmentId().equals(shipmentId))
                .toList();
    }

    // Create shipment detail
    public ShipmentDetail createShipmentDetail(ShipmentDetail shipmentDetail) {
        return shipmentDetailRepository.save(shipmentDetail);
    }
}

