CREATE DATABASE facilita_juridico;
\c facilita_juridico;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS clientes 
    (id UUID PRIMARY KEY UNIQUE NOT NULL, 
    nome VARCHAR(255) NOT NULL, 
    email VARCHAR(255) UNIQUE NOT NULL, 
    telefone VARCHAR(20) UNIQUE NOT NULL);

CREATE TABLE IF NOT EXISTS coordenadas 
    (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
    local POINT);

CREATE TABLE IF NOT EXISTS clientes_coordenadas 
    (cliente_id UUID REFERENCES clientes (id), 
    coordenada_id UUID REFERENCES coordenadas (id));