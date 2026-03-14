# Microservice Pet-Owner System
Full-stack microservices application built with Java Spring Boot and Angular. It manages "owners" and "pets" through independently deployable services, orchestrated via a centralized gateway and service registry.

## Architecture Overview

The application follows a standard Spring Cloud microservices pattern. It utilizes Spring Cloud Gateway for routing, Netflix Eureka for service discovery, and Spring Cloud LoadBalancer for client-side load balancing.

| Service Name | Description | Technology | Port Mapping (Host:Container) |
| :--- | :--- | :--- | :--- |
| **frontend** | User Interface | Angular / Nginx | 4200:80 |
| **gateway-service** | Entry point and route management | Spring Cloud Gateway | 8080:8080 |
| **discovery-service** | Service registry | Spring Cloud Netflix Eureka | 8761:8761 |
| **config-service** | Centralized configuration | Spring Cloud Config | 8888:8888 |
| **owners-service** | Manages owner business logic | Spring Boot | Internal only |
| **pets-service** | Manages pet business logic (Scaled: 2 instances) | Spring Boot | Internal only |
| **owners-db** | Database for owner records | PostgreSQL 15 | Internal only |
| **pets-db** | Database for pet records | PostgreSQL 15 | Internal only |

## Tech Stack

* **Language:** Java 17
* **Framework:** Spring Boot 3.5.7
* **Cloud Infrastructure:** Spring Cloud (2023.0.6)
    * Spring Cloud Gateway
    * Spring Cloud Config
    * Spring Cloud Netflix Eureka Client
    * Spring Cloud LoadBalancer
* **Database:** PostgreSQL 15 (Alpine)
* **Frontend:** Angular
* **Utilities:** Lombok

#### Also includes a monolith application for comparison

