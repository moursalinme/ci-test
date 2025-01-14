-- Connect to the database first
\c pet_store;

-- Begin a single transaction
BEGIN;

-- Insert species first
INSERT INTO species (name) VALUES
('Dog'),
('Cat'),
('Bird'),
('Hamster'),
('Rabbit');

-- Insert pets data using the correct sequence values (increment by 50)
INSERT INTO pets (name, species_id, birthday, breed, gender, status) VALUES
-- Dogs (species_id = 1)
('Max', 1, '2023-06-15', 'Golden Retriever', 'MALE', 'AVAILABLE'),
('Luna', 1, '2023-08-20', 'German Shepherd', 'FEMALE', 'AVAILABLE'),
('Charlie', 1, '2023-04-10', 'Labrador', 'MALE', 'SOLD'),
('Bella', 1, '2023-07-01', 'Poodle', 'FEMALE', 'UNDER_TREATMENT'),
('Rocky', 1, '2023-05-12', 'Bulldog', 'MALE', 'AVAILABLE'),

-- Cats (species_id = 51)
('Lucy', 51, '2023-09-01', 'Persian', 'FEMALE', 'AVAILABLE'),
('Oliver', 51, '2023-03-15', 'Siamese', 'MALE', 'SOLD'),
('Milo', 51, '2023-08-05', 'Maine Coon', 'MALE', 'AVAILABLE'),
('Sophie', 51, '2023-07-20', 'Russian Blue', 'FEMALE', 'UNDER_TREATMENT'),
('Leo', 51, '2023-06-30', 'Bengal', 'MALE', 'AVAILABLE'),

-- Birds (species_id = 101)
('Rio', 101, '2023-10-01', 'Parakeet', 'MALE', 'AVAILABLE'),
('Coco', 101, '2023-09-15', 'Cockatiel', 'FEMALE', 'SOLD'),
('Sky', 101, '2023-08-25', 'Canary', 'UNKNOWN', 'AVAILABLE'),
('Pearl', 101, '2023-07-10', 'Cockatoo', 'FEMALE', 'AVAILABLE'),
('Blue', 101, '2023-06-20', 'Macaw', 'MALE', 'UNDER_TREATMENT'),

-- Hamsters (species_id = 151)
('Peanut', 151, '2023-11-01', 'Syrian', 'MALE', 'AVAILABLE'),
('Cookie', 151, '2023-10-15', 'Dwarf', 'FEMALE', 'SOLD'),
('Nibbles', 151, '2023-09-20', 'Roborovski', 'UNKNOWN', 'AVAILABLE'),
('Ginger', 151, '2023-08-30', 'Chinese', 'FEMALE', 'AVAILABLE'),
('Hammy', 151, '2023-08-01', 'Winter White', 'MALE', 'UNDER_TREATMENT'),

-- Rabbits (species_id = 201)
('Thumper', 201, '2023-07-15', 'Holland Lop', 'MALE', 'AVAILABLE'),
('Daisy', 201, '2023-06-01', 'Dutch', 'FEMALE', 'SOLD'),
('Cotton', 201, '2023-05-20', 'Rex', 'UNKNOWN', 'AVAILABLE'),
('Hoppy', 201, '2023-04-15', 'Angora', 'MALE', 'AVAILABLE'),
('Flopsy', 201, '2023-03-10', 'Netherland Dwarf', 'FEMALE', 'UNDER_TREATMENT');

COMMIT;