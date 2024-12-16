
-- Create a schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS resident_management;
USE resident_management;



-- =============================================
-- Utilities
-- =============================================


/**
 * Table: provinces
 * Description: Stores information about provinces.
 *
 * Columns:
 * - province_id: Unique identifier for each province.
 * - province_name: Name of the province (unique).
 * - region: Region where the province is located.
 *
 * Indexes:
 * - uk_province_name: Ensures unique province names.
 * - idx_region: Improves query performance on region-based searches.
 */
CREATE TABLE IF NOT EXISTS provinces (
    province_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    province_name VARCHAR(255) NOT NULL,
    region VARCHAR(100),
    UNIQUE KEY uk_province_name (province_name),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_region (region)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/**
 * Table: municipalities
 * Description: Stores information about municipalities.
 *
 * Columns:
 * - municipality_id: Unique identifier for each municipality.
 * - municipality_name: Name of the municipality.
 * - province_id: Foreign key referencing the provinces table.
 * - municipality_type: Type of municipality (City or Municipality).
 *
 * Constraints:
 * - uk_municipality_name_province: Ensures unique combination of municipality name and province.
 * - fk_municipality_province: Foreign key relationship with provinces table.
 *
 * Indexes:
 * - idx_municipality_type: Improves query performance on municipality type-based searches.
 */
CREATE TABLE IF NOT EXISTS municipalities (
    municipality_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    municipality_name VARCHAR(255) NOT NULL,
    province_id INT UNSIGNED NOT NULL,
    municipality_type ENUM('City', 'Municipality') NOT NULL DEFAULT 'Municipality',
    UNIQUE KEY uk_municipality_name_province (municipality_name, province_id),
    FOREIGN KEY fk_municipality_province (province_id) REFERENCES provinces(province_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_municipality_type (municipality_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/**
 * Table: barangays
 * Description: Stores information about barangays (smallest administrative division in the Philippines).
 *
 * Columns:
 * - barangay_id: Unique identifier for each barangay.
 * - barangay_name: Name of the barangay.
 * - municipality_id: Foreign key referencing the municipalities table.
 *
 * Constraints:
 * - uk_barangay_name_municipality: Ensures unique combination of barangay name and municipality.
 * - fk_barangay_municipality: Foreign key relationship with municipalities table.
 */
CREATE TABLE IF NOT EXISTS barangays (
    barangay_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    barangay_name VARCHAR(255) NOT NULL,
    municipality_id INT UNSIGNED NOT NULL,
    UNIQUE KEY uk_barangay_name_municipality (barangay_name, municipality_id),
    FOREIGN KEY fk_barangay_municipality (municipality_id) REFERENCES municipalities(municipality_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/**
 * Table: streets
 * Description: Stores information about streets within barangays.
 *
 * Columns:
 * - street_id: Unique identifier for each street.
 * - street_name: Name of the street.
 * - barangay_id: Foreign key referencing the barangays table.
 * - street_type: Type of street (e.g., Avenue, Street, Road).
 *
 * Constraints:
 * - uk_street_name_barangay: Ensures unique combination of street name and barangay.
 * - fk_street_barangay: Foreign key relationship with barangays table.
 *
 * Indexes:
 * - idx_street_type: Improves query performance on street type-based searches.
 */
CREATE TABLE IF NOT EXISTS streets (
    street_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    street_name VARCHAR(255) NOT NULL,
    barangay_id INT UNSIGNED NOT NULL,
    street_type ENUM('Avenue', 'Street', 'Road', 'Boulevard', 'Lane', 'Drive'),
    UNIQUE KEY uk_street_name_barangay (street_name, barangay_id),
    FOREIGN KEY fk_street_barangay (barangay_id) REFERENCES barangays(barangay_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_street_type (street_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/**
 * Table: occupations
 * Description: Stores occupation options for residents.
 *
 * Columns:
 * - occupation_id: Unique identifier for each occupation.
 * - occupation_name: Name of the occupation (unique).
 */
CREATE TABLE IF NOT EXISTS occupations (
    occupation_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    occupation_name VARCHAR(255) NOT NULL,
    UNIQUE KEY uk_occupation_name (occupation_name),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


/**
 * Table: nationalities
 * Description: Stores nationality options for residents.
 *
 * Columns:
 * - nationality_id: Unique identifier for each nationality.
 * - nationality_name: Name of the nationality (unique).
 */
CREATE TABLE IF NOT EXISTS nationalities (
    nationality_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nationality_name VARCHAR(255) NOT NULL,
    UNIQUE KEY uk_nationality_name (nationality_name),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



/**
 * Table: religions
 * Description: Stores religion options for residents.
 *
 * Columns:
 * - religion_id: Unique identifier for each religion.
 * - religion_name: Name of the religion (unique).
 */
CREATE TABLE IF NOT EXISTS religions (
    religion_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    religion_name VARCHAR(255) NOT NULL,
    UNIQUE KEY uk_religion_name (religion_name),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/**
 * Table: benefits
 * Description: Stores information about benefits available to residents.
 *
 * Columns:
 * - benefit_id: Unique identifier for each benefit.
 * - benefit_name: Name of the benefit (unique).
 */
CREATE TABLE IF NOT EXISTS benefits (
    benefit_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    benefit_name VARCHAR(255) NOT NULL,
    UNIQUE KEY uk_benefit_name (benefit_name),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



/**
 * Table: education_levels
 * Description: Stores standardized educational levels that can be assigned to residents
 * (e.g., Elementary, High School, Bachelor's Degree, Master's Degree, etc.).
 *
 * Columns:
 * - level_id: Unique identifier for each education level
 * - level_name: Standard name of the education level (e.g., 'Bachelor's Degree')
 * - description: Optional detailed description of the education level
 * - sort_order: Numeric value to maintain proper ordering of education levels
 *
 * Notes:
 * - Education levels are predefined system values
 * - Each level name must be unique across the system
 * - Sort order allows display of levels in logical progression (e.g., Elementary before High School)
 */
CREATE TABLE IF NOT EXISTS educational_attainment  (
    educational_attainment_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    educational_attainment_name VARCHAR(255) NOT NULL,
    UNIQUE KEY uk_educational_attainment_name (educational_attainment_name),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;




CREATE TABLE IF NOT EXISTS establishment_type (
    establishment_type_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    establishment_type_name VARCHAR(255) NOT NULL,
    UNIQUE KEY uk_establishment_type_name (establishment_type_name),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



-- =============================================
-- Residential Records
-- =============================================


/**
 * Table: residents
 * Description: Stores comprehensive information about residents.
 *
 * Columns:
 * - resident_id: Unique identifier for each resident.
 * - full_name: Full name of the resident.
 * - first_name, last_name, middle_name: Individual name components.
 * - gender: Gender of the resident.
 * - image_base64, fingerprint_base64: Biometric data stored as base64 strings.
 * - date_of_birth: Resident's date of birth.
 * - civil_status: Marital status of the resident.
 * - occupation_id, nationality_id, religion_id, benefit_id: Foreign keys to respective tables.
 * - is_archived: Flag to indicate if the resident record is archived.
 *
 * Constraints:
 * - Foreign key relationships with occupations, nationalities, religions, and benefits tables.
 *
 * Indexes:
 * - idx_full_name, idx_date_of_birth, idx_civil_status: Improve query performance on these fields.
 */
CREATE TABLE IF NOT EXISTS residents (
    resident_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    image_base64 LONGTEXT,
    fingerprint_base64 LONGTEXT,
    date_of_birth DATE NOT NULL,
    civil_status ENUM('Single', 'Married', 'Divorced', 'Widowed', 'Live In', 'Separated', 'Solo Parent') NOT NULL,
    educational_attainment_id INT UNSIGNED,
    occupation_id INT UNSIGNED,
    nationality_id INT UNSIGNED,
    religion_id INT UNSIGNED,
    benefit_id INT UNSIGNED,
    isPersonwithDisability ENUM('Yes', 'No') NOT NULL,
    isOFW ENUM('Yes', 'No') NOT NULL,
    additional_income VARCHAR(100),
    is_archived BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY fk_resident_educational_attainment (educational_attainment_id) REFERENCES educational_attainment(educational_attainment_id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY fk_resident_occupation (occupation_id) REFERENCES occupations(occupation_id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY fk_resident_nationality (nationality_id) REFERENCES nationalities(nationality_id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY fk_resident_religion (religion_id) REFERENCES religions(religion_id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY fk_resident_benefit (benefit_id) REFERENCES benefits(benefit_id) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_full_name (full_name),
    INDEX idx_date_of_birth (date_of_birth),
    INDEX idx_civil_status (civil_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/**
 * Table: addresses
 * Description: Stores detailed address information for residents.
 *
 * Columns:
 * - address_id: Unique identifier for each address.
 * - resident_id: Foreign key referencing the residents table.
 * - house_number: House number of the residence.
 * - street_id, barangay_id, municipality_id, province_id: Foreign keys to respective location tables.
 * - postal_code: Postal code of the address.
 *
 * Constraints:
 * - Foreign key relationships with residents, streets, barangays, municipalities, and provinces tables.
 *
 * Indexes:
 * - idx_postal_code: Improves query performance on postal code-based searches.
 */
CREATE TABLE IF NOT EXISTS addresses (
    address_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    resident_id BIGINT UNSIGNED NOT NULL,
    house_number VARCHAR(20) NOT NULL,
    street_id INT UNSIGNED,
    barangay_id INT UNSIGNED,
    municipality_id INT UNSIGNED,
    province_id INT UNSIGNED,
    postal_code VARCHAR(10),
    FOREIGN KEY fk_resident_id (resident_id) REFERENCES residents(resident_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY fk_address_street (street_id) REFERENCES streets(street_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY fk_address_barangay (barangay_id) REFERENCES barangays(barangay_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY fk_address_municipality (municipality_id) REFERENCES municipalities(municipality_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY fk_address_province (province_id) REFERENCES provinces(province_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_postal_code (postal_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


/**
 * Table: contacts
 * Description: Stores contact information for residents.
 *
 * Columns:
 * - contact_id: Unique identifier for each contact entry.
 * - resident_id: Foreign key referencing the residents table.
 * - email: Email address of the resident.
 * - mobile: Mobile number of the resident.
 *
 * Constraints:
 * - Foreign key relationship with residents table.
 */
CREATE TABLE IF NOT EXISTS contacts (
    contact_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    resident_id BIGINT UNSIGNED NOT NULL,
    email VARCHAR(255),
    mobile VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY fk_contact_resident (resident_id) REFERENCES residents(resident_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


/**
 * Table: household_information
 * Description: Stores household and housing-related information for residents.
 *
 * Columns:
 * - household_information_id: Unique identifier for each household entry.
 * - resident_id: Foreign key referencing the residents table.
 * - isHouseholdHead: Indicates if the resident is the head of the household (Yes/No).
 * - childrenCount: Number of children in the household.
 * - usageIodized: Information on whether iodized products are used in the household.
 * - usageFortifiedRice: Information on whether fortified rice is used in the household.
 * - type_of_housing: Type of housing (e.g., apartment, detached house).
 * - housing_status: Ownership or rental status of the housing.
 * - water_source: Source of water for the household (e.g., tap, well).
 * - toilet_type: Type of toilet used in the household.
 * - created_at: Timestamp when the record was created.
 * - updated_at: Timestamp when the record was last updated.
 *
 * Constraints:
 * - Foreign key relationship with the residents table.
 * - Cascades on delete and updates to maintain referential integrity.
 */

CREATE TABLE IF NOT EXISTS household_information (
    household_information_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    resident_id BIGINT UNSIGNED NOT NULL,
    isHouseholdHead ENUM('Yes', 'No') NOT NULL,
    childrenCount INT UNSIGNED,
    usageIodized VARCHAR(100),
    usageFortifiedRice VARCHAR(100),
    type_of_housing VARCHAR(100),
    housing_status VARCHAR(100),
    water_source VARCHAR(100),
    toilet_type VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY fk_household_information_id_resident (resident_id) REFERENCES residents(resident_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



/**
 * Table: family_health_status
 * Description: Stores family health information for residents, including
 *              family planning, pregnancy, lactation, and nursing details.
 *
 * Columns:
 * - family_health_status_id: Unique identifier for each family health status entry.
 * - resident_id: Foreign key referencing the residents table, linking health data to residents.
 * - is_family_planning: Indicates whether the resident is practicing family planning.
 * - family_planning_method: Specifies the method of family planning being used.
 * - is_pregnant: Indicates whether the resident is currently pregnant.
 * - is_lactating: Indicates whether the resident is currently lactating.
 * - nursing_method: Specifies the nursing method used by the resident, if applicable.
 * - created_at: Timestamp indicating when the record was created.
 * - updated_at: Timestamp indicating when the record was last updated.
 */

CREATE TABLE IF NOT EXISTS family_health_status (
    family_health_status_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    resident_id BIGINT UNSIGNED NOT NULL,
    is_family_planning VARCHAR(100),
    family_planning_method VARCHAR(100),
    is_pregnant VARCHAR(100),
    is_lactating VARCHAR(100),
    nursing_method VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY fk_family_health_status_resident (resident_id) REFERENCES residents(resident_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;




CREATE TABLE IF NOT EXISTS establishment (
    establishment_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    owner_name VARCHAR(100),
    establishment_type_id BIGINT UNSIGNED NOT NULL,
    street_id INT UNSIGNED,
    building_number VARCHAR(20) NOT NULL,
    type_of_housing VARCHAR(100),
    water_source VARCHAR(100),
    toilet_type VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY fk_address_street_establishment (street_id) REFERENCES streets(street_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY fk_establishment_type (establishment_type_id) REFERENCES establishment_type(establishment_type_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


/**
 * Table: documents
 * Description: Stores information about documents issued to residents.
 *
 * Columns:
 * - document_id: Unique identifier for each document.
 * - document_title: Type of document issued.
 * - resident_id: Foreign key referencing the residents table.
 * - required_fields: JSON array storing required fields for the document.
 * - issued_by: Name of the person who issued the document.
 * - price: fee for processing the document
 * - issued_date: Date when the document was issued.
 *
 * Constraints:
 * - Foreign key relationship with residents table.
 */
CREATE TABLE IF NOT EXISTS documents (
    document_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    document_title ENUM('Barangay Business Clearance', 'Barangay Clearance', 'Certificate of Indigency', 'Certificate of Residency') NOT NULL,
    resident_id BIGINT UNSIGNED NOT NULL,
    required_fields JSON NOT NULL,
    issued_by VARCHAR(255) NOT NULL,
    price INT UNSIGNED NOT NULL,
    issued_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY fk_issued_document_resident (resident_id) REFERENCES residents(resident_id) ON DELETE CASCADE ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



/**
 * Table: auth
 * Description: Stores authentication information for residents.
 *
 * Columns:
 * - auth_id: Unique identifier for each authentication record.
 * - role: Role of the resident (admin, secretary, treasurer, volunteer).
 * - resident_id: Foreign key referencing the residents table.
 * - username: Username for the resident.
 * - password: Password for the resident.
 *
 * Constraints:
 * - Foreign key relationship with residents table.
 */
CREATE TABLE IF NOT EXISTS auth (
    auth_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    role ENUM('admin', 'secretary', 'volunteer', 'bpw', 'motherleader', 'clerk') NOT NULL,
    resident_id BIGINT UNSIGNED NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY fk_auth_resident (resident_id) REFERENCES residents(resident_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



CREATE TABLE IF NOT EXISTS sessions (
    session_id VARCHAR(36) PRIMARY KEY,
    auth_id BIGINT UNSIGNED NOT NULL,
    token VARCHAR(255) NOT NULL,
    device_info TEXT,
    last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY fk_session_auth (auth_id) REFERENCES auth(auth_id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_auth_id (auth_id),
    INDEX idx_last_active (last_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/**
 * Table: officers_batch
 * Description: Stores information about the term of the officers.
 *
 * Columns:
 * - batch_id: Unique identifier for each batch of officers.
 * - term: The term of the officers.
 * - created_at: The timestamp when the record was created, set to the current timestamp by default.
 * - updated_at: The timestamp when the record was last updated, set to the current timestamp on update.
 */
CREATE TABLE IF NOT EXISTS officers_batch (
    batch_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    term VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/**
 * Table: officers_role
 * Description: Stores information about the officers and their roles.
 *
 * Columns:
 * - role_id: Unique identifier for each officer's role.
 * - batch_id: Foreign key referencing the officers_batch table.
 * - image_base64: The base64-encoded image of the officer.
 * - full_name: The full name of the officer.
 * - role: The role of the officer.
 * - created_at: The timestamp when the record was created, set to the current timestamp by default.
 * - updated_at: The timestamp when the record was last updated, set to the current timestamp on update.
 *
 * Constraints:
 * - Foreign key relationship with officers_batch table.
 */
CREATE TABLE IF NOT EXISTS officers_role (
    role_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    batch_id BIGINT UNSIGNED NOT NULL,
    image_base64 LONGTEXT NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY fk_officers_role_officers_batch (batch_id) REFERENCES officers_batch(batch_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- =============================================
-- Insert dummy data
-- =============================================
-- Insert into provinces
INSERT INTO provinces (province_name, region)
VALUES ('Bulacan', 'Central Luzon');

-- Insert into municipalities
INSERT INTO municipalities (municipality_name, province_id, municipality_type) VALUES
('Bulakan', 1, 'Municipality'),
('Malolos', 1, 'City');

-- Insert into barangays
INSERT INTO barangays (barangay_name, municipality_id)
VALUES ('Bambang', 1);

-- Insert into streets
INSERT INTO streets (street_name, barangay_id, street_type) VALUES
('Purok 1', 1, 'Street'),
('Purok 2', 1, 'Street'),
('Purok 3', 1, 'Street'),
('Purok 4', 1, 'Street'),
('Purok 5', 1, 'Street'),
('Purok 6', 1, 'Drive');


INSERT INTO educational_attainment (educational_attainment_name) VALUES
('No Education'),
('Elementary Undergraduate'),
('Elementary Graduate'),
('High School Undergraduate'),
('High School Graduate'),
('College Undergraduate'),
('College Graduate'),
('Vocational'),
('Post Graduate'),
('Out of School Youth'),
('Junior High Graduate'),
('Senior High Graduate');


-- Insert into occupations
INSERT INTO occupations (occupation_name)
VALUES ('N/A'),
    ('Engineer'),
    ('Doctor'),
    ('Teacher'),
    ('Artist'),
    ('Programmer'),
    ('Lawyer'),
    ('Nurse'),
    ('Accountant'),
    ('Architect'),
    ('Scientist');

-- Insert into nationalities
INSERT INTO nationalities (nationality_name)
VALUES ('Filipino'),
    ('American'),
    ('Canadian'),
    ('British'),
    ('Australian'),
    ('Indian'),
    ('Japanese'),
    ('Chinese'),
    ('German'),
    ('French'),
    ('Italian');

-- Insert into religions
INSERT INTO religions (religion_name)
VALUES ('N/A'),
    ('Catholic'),
    ('Christian'),
    ('Muslim'),
    ('Hindu'),
    ('Buddhist'),
    ('Jewish'),
    ('Sikh'),
    ('Atheist'),
    ('Agnostic'),
    ('Taoist'),
    ('Shinto');

-- Insert into benefits
INSERT INTO benefits (benefit_name)
VALUES ('N/A'),
    ('Senior Citizen'),
    ('OFW'),
    ('PWD'),
    ('4Ps');

-- Insert into residents
INSERT INTO residents (full_name, first_name, last_name, middle_name, gender, date_of_birth, civil_status, educational_attainment_id, occupation_id, nationality_id, religion_id, benefit_id, isOFW, isPersonwithDisability, additional_income, is_archived)
VALUES ('John Deniel Santos Dela Pena', 'John Deniel', 'Dela Pena', 'Santos', 'Male', '2006-01-01', 'Single', 5, 1, 1, 1, 1, 'No', 'No', 'N/A', FALSE);

-- Insert into addresses
INSERT INTO addresses (resident_id, house_number, street_id, barangay_id, municipality_id, province_id, postal_code)
VALUES (1, '123', 1, 1, 1, 1, '12345');

-- Insert into contacts
INSERT INTO contacts (resident_id, email, mobile)
VALUES (1, 'example@example.com', '1234567890');

-- Insert dummy data into household_information
INSERT INTO household_information (resident_id, isHouseholdHead, childrenCount, usageIodized, usageFortifiedRice, type_of_housing, housing_status, water_source, toilet_type)
VALUES (1, 'Yes', 0, 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A');

-- Insert dummy data into family_health_status
INSERT INTO family_health_status (resident_id, is_family_planning, family_planning_method, is_pregnant, is_lactating, nursing_method)
VALUES (1, 'No', 'N/A', 'No', 'No', 'N/A');

-- Insert into documents
INSERT INTO documents (document_title, resident_id, required_fields, issued_by, price, issued_date)
VALUES
('Barangay Business Clearance', 1, '{"Business Name": "ABC Corp", "Address": "123 Main St"}', 'Secretary Kristina Marie Santos', 20, CURRENT_TIMESTAMP),
('Barangay Clearance', 1, '{"Purpose": "General Clearance", "Address": "456 Elm St"}', 'Secretary Kristina Marie Santos', 20, CURRENT_TIMESTAMP),
('Certificate of Indigency', 1, '{"Income": "Below Minimum Wage", "Dependents": "3"}', 'Secretary Kristina Marie Santos', 20, CURRENT_TIMESTAMP),
('Certificate of Residency', 1, '{"Years of Residency": "5", "Address": "789 Oak St"}', 'Secretary Kristina Marie Santos', 20, CURRENT_TIMESTAMP);

INSERT INTO establishment_type (establishment_type_name) VALUES
('Coffee shop'),
('Laundry shop'),
('Restaurant'),
('Barbershop'),
('Bookstore'),
('Clothing store'),
('Pharmacy'),
('Supermarket'),
('Electronics store'),
('Fitness center');

INSERT INTO establishment (owner_name, establishment_type_id, street_id, building_number, type_of_housing, water_source, toilet_type) VALUES
('John Doe', 1, 1, '12A', 'Concrete', 'Municipal', 'Flush toilet'),
('Jane Smith', 2, 2, '45B', 'Concrete', 'Well', 'Composting toilet'),
('Alice Brown', 3, 3, '78C', 'Concrete', 'Municipal', 'Flush toilet'),
('Bob Johnson', 1, 4, '90D', 'Concrete', 'Rainwater', 'Flush toilet'),
('Carol White', 5, 5, '23E', 'Concrete', 'Municipal', 'Pit latrine'),
('David Black', 6, 1, '34F', 'Concrete', 'Borehole', 'Flush toilet'),
('Emma Green', 7, 2, '56G', 'Concrete', 'Municipal', 'Flush toilet'),
('N/A', 8, 3, '67H', 'Concrete', 'Rainwater', 'Composting toilet'),
('Grace Lee', 9, 4, '89I', 'Concrete', 'Municipal', 'Flush toilet'),
('Hannah Wilson', 10, 5, '101J', 'Concrete', 'Well', 'Pit latrine');

-- Insert admin role
INSERT INTO auth (role, resident_id, username, password)
VALUES ('admin', 1, 'user1', '$2b$10$j1BFG4hR07qGvKs6cc4jE.kJl5Ko3eRhBl3pbMCwIH8DJiRSFYYgW');
