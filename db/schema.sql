CREATE DATABASE facilita_juridico;
\c facilita_juridico;

CREATE TABLE IF NOT EXISTS clientes 
    (id CHAR(36) PRIMARY KEY UNIQUE NOT NULL, 
    nome VARCHAR(255) NOT NULL, 
    email VARCHAR(255) UNIQUE NOT NULL, 
    telefone VARCHAR(20) UNIQUE NOT NULL);

CREATE TABLE IF NOT EXISTS coordenadas 
    (id CHAR(36) PRIMARY KEY UNIQUE NOT NULL, 
    local POINT);

CREATE TABLE IF NOT EXISTS clientes_coordenadas 
    (cliente_id CHAR(36) REFERENCES clientes (id), 
    coordenada_id CHAR(36) REFERENCES coordenadas (id));