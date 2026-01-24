CREATE TABLE owners (
    owner_id      UUID NOT NULL PRIMARY KEY,
    name          VARCHAR(255),
    surname       VARCHAR(255),
    phone_number  INTEGER,
    date_of_birth TIMESTAMP,
    address       VARCHAR(255)
);