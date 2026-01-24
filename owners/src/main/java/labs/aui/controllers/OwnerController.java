package labs.aui.controllers;

import labs.aui.DTOS.OwnerCollectionDTO;
import labs.aui.DTOS.OwnerCreateUpdateDTO;
import labs.aui.DTOS.OwnerReadDTO;
import labs.aui.DTOS.SimpleOwner;
import labs.aui.Owner;
import labs.aui.mappers.OwnerMapper;
import labs.aui.service.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/owners")
public class OwnerController {

    private final OwnerService ownerService;
    private final OwnerMapper ownerMapper;

    @Autowired
    private RestTemplate restTemplate;

    @Value("http://PETS-SERVICE/api/events")
    private String eventsUrl;

    @Autowired
    public OwnerController(OwnerService ownerService, OwnerMapper ownerMapper) {
        this.ownerService = ownerService;
        this.ownerMapper = ownerMapper;
    }

    @GetMapping
    public ResponseEntity<List<OwnerCollectionDTO>> getAllOwners() {
        List<OwnerCollectionDTO> dtos = ownerService.findAll().stream()
                .map(ownerMapper::toCollectionDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{ownerId}")
    public ResponseEntity<OwnerReadDTO> getOwnerById(@PathVariable UUID ownerId) {
        Owner owner = ownerService.findById(ownerId);
        return ResponseEntity.ok(ownerMapper.toReadDto(owner));
    }

    @PostMapping
    public ResponseEntity<OwnerReadDTO> createOwner(@RequestBody OwnerCreateUpdateDTO dto) {
        Owner owner = ownerMapper.toEntity(dto);
        Owner createdOwner = ownerService.save(owner);

        restTemplate.postForObject(eventsUrl,
                new SimpleOwner(owner.getOwnerId(), owner.getName()),
                Void.class
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ownerMapper.toReadDto(createdOwner));
    }

    @PutMapping("/{ownerId}")
    public ResponseEntity<OwnerReadDTO> updateOwner(@PathVariable UUID ownerId, @RequestBody OwnerCreateUpdateDTO dto) {
        Owner owner = ownerMapper.toEntity(dto);
        owner.setOwnerId(ownerId);
        Owner updatedOwner = ownerService.save(owner);
        return ResponseEntity.ok(ownerMapper.toReadDto(updatedOwner));
    }

    @DeleteMapping("/{ownerId}")
    public ResponseEntity<Void> deleteOwner(@PathVariable UUID ownerId) {
        ownerService.delete(ownerId);
        restTemplate.delete(eventsUrl + "/" + ownerId);
        return ResponseEntity.noContent().build();
    }
}
