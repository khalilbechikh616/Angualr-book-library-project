CREATE TABLE compte (
    id_compte INT AUTO_INCREMENT PRIMARY KEY,
    Firstname VARCHAR(50) NOT NULL,
    Lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    telephonenumber VARCHAR(20) NOT NULL,
    birthdaydate DATE NOT NULL
      INDEX (email),           -- Add index on 'email' column
    INDEX (password)
);

CREATE TABLE profile (
    id_profile INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    FOREIGN KEY (email) REFERENCES compte(email),
    FOREIGN KEY (password) REFERENCES compte(password)
);
CREATE TABLE utilisateur (
    id_utilisateur INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL
);
CREATE TABLE categorie (
    nomcategorie VARCHAR(100) PRIMARY KEY
    link_img TEXT
);
CREATE TABLE livre (
    id_livre INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    auteur VARCHAR(255) NOT NULL,
    nomcategorie VARCHAR(100),
    disponibilite INT,
    link_image TEXT,
    pdf_link VARCHAR(255),
    FOREIGN KEY (nomcategorie) REFERENCES categorie(nomcategorie) on delete cascade
);
CREATE TABLE emprunt ( id_livre INT, email varchar(100), FOREIGN KEY (id_livre) REFERENCES livre(id_livre), FOREIGN KEY (email) REFERENCES compte(email) );
CREATE TABLE commentaire (
    id_commentaire INT AUTO_INCREMENT PRIMARY KEY,
    commentaire TEXT,
    nom_livre VARCHAR(255),
    FOREIGN KEY (nom_livre) REFERENCES livre(titre)
);
CREATE TABLE admin (
    id_admin INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);
CREATE TABLE bibliotheque (
    id_bibliotheque INT AUTO_INCREMENT PRIMARY KEY,
    nombibliotheque VARCHAR(255) NOT NULL,
    adresse TEXT
);


