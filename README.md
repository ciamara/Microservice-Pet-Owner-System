# Internet_Service_Applications
simple pet-owner system in java

## Monolith     
-> monolith application with both pet and owner entities managed in one project in the same database            

## Gateway         
-> gateway application providing communication between separate projects with separate databases owners and pets on different ports          

## Owners
-> project managing owner entities and requests directed at owners        

## Pets        
-> project managing pet entities and requests directed at pets, with simple owner implementation to maintain link between entities (one to many)     

##  Angular       
-> angular project with view representation of the owner pet system, this uses the gateway and microservices projects pets and owners   
