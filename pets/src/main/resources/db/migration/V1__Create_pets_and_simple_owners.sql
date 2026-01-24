CREATE TABLE simple_owners (
    simple_owner_id   UUID NOT NULL PRIMARY KEY,
    simple_owner_name VARCHAR(255)
);

CREATE TABLE pets (
                      pet_id           UUID NOT NULL PRIMARY KEY,
                      name             VARCHAR(255),
                      animal           VARCHAR(50),
                      date_of_birth    TIMESTAMP,
                      weight           FLOAT,
                      breed            VARCHAR(255),
                      color            VARCHAR(255),
                      gender           VARCHAR(50),
                      simple_owner_id  UUID,
                      CONSTRAINT fk_pet_owner FOREIGN KEY (simple_owner_id) REFERENCES simple_owners(simple_owner_id)
);