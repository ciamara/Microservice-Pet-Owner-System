package labs.aui.controllers;

import labs.aui.service.SimpleOwnerService;
import labs.aui.service.PetService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import labs.aui.SimpleOwner;

@RestController
@RequestMapping("/api/events")
public class CategoryEventController {

    private final SimpleOwnerService simpleOwnerService;
    private final PetService petService;

    public CategoryEventController(SimpleOwnerService simpleOwnerService, PetService petService) {
        this.simpleOwnerService = simpleOwnerService;
        this.petService = petService;
    }

    @PostMapping
    public ResponseEntity<Void> createSimpleOwner(@RequestBody SimpleOwner simpleOwner) {
        System.out.println("Received sync event for owner: " + simpleOwner.getSimpleOwnerId());
        simpleOwnerService.createSimpleOwner(simpleOwner);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{ownerId}")
    public ResponseEntity<Void> deleteSimpleOwner(@PathVariable("ownerId") UUID simpleOwnerId) {
        petService.deletePetsByOwnerId(simpleOwnerId);
        simpleOwnerService.deleteSimpleOwner(simpleOwnerId);
        return ResponseEntity.noContent().build();
    }
}
