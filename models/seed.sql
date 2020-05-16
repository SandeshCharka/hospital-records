ALTER TABLE `medicaldb`.`Doctors` 
CHANGE COLUMN `createdAt` `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
CHANGE COLUMN `UpdatedAt` `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ;
INSERT INTO Doctors (name) VALUES ('Dr. John Deer');
INSERT INTO Doctors (name) VALUES ('Dr. Marcia Rose');
INSERT INTO Doctors (name) VALUES ('Dr. Louis Man');

ALTER TABLE `medicaldb`.`Patients` 
CHANGE COLUMN `createdAt` `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
CHANGE COLUMN `UpdatedAt` `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ;
INSERT INTO Patients (name, DoctorId ) VALUES ('Louisa Smith', 1);
INSERT INTO Patients (name, DoctorId ) VALUES ('Joanna Pruitt', 2);
INSERT INTO Patients (name, DoctorId ) VALUES ('Ross Davis', 3);
INSERT INTO Patients (name, DoctorId ) VALUES ('Grant Lawson', 1);
INSERT INTO Patients (name, DoctorId ) VALUES ('Jean Thomas', 2);
INSERT INTO Patients (name, DoctorId ) VALUES ('Clementine Rodgers', 3);
INSERT INTO Patients (name, DoctorId ) VALUES ('Gregory Williams', 1);
INSERT INTO Patients (name, DoctorId ) VALUES ('Cane Goose', 2);

ALTER TABLE `medicaldb`.`medicalhistories`
CHANGE COLUMN `createdAt` `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
CHANGE COLUMN `UpdatedAt` `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ;
INSERT INTO medicalhistories (data, PatientId ) VALUES ('Has alot of issues', 1);
INSERT INTO medicalhistories (data, PatientId ) VALUES ('yeet', 1);
INSERT INTO medicalhistories (data, PatientId ) VALUES ("Visits every week", 2);
INSERT INTO medicalhistories (data, PatientId ) VALUES ('peep', 2);
INSERT INTO medicalhistories (data, PatientId ) VALUES ("Loves cats", 3);
INSERT INTO medicalhistories (data, PatientId ) VALUES ('keep', 3);
INSERT INTO medicalhistories (data, PatientId ) VALUES ("Has a dog named James", 4);
INSERT INTO medicalhistories (data, PatientId ) VALUES ('heep', 4);
INSERT INTO medicalhistories (data, PatientId ) VALUES ("Wants to be a nurse", 5);
INSERT INTO medicalhistories (data, PatientId ) VALUES ('heek', 5);
INSERT INTO medicalhistories (data, PatientId ) VALUES ("Lives near the beach", 6);
INSERT INTO medicalhistories (data, PatientId ) VALUES ('kite', 6);
INSERT INTO medicalhistories (data, PatientId ) VALUES ("Has allergies", 7);
INSERT INTO medicalhistories (data, PatientId ) VALUES ('yikes', 7);
INSERT INTO medicalhistories (data, PatientId ) VALUES ("Goes by Butch", 8);
INSERT INTO medicalhistories (data, PatientId ) VALUES ('okayChamp', 8);