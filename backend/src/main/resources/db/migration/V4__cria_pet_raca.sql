CREATE TABLE IF NOT EXISTS  raca (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    especie VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS  pet (
     id BIGSERIAL PRIMARY KEY,

     nome VARCHAR(255) NOT NULL,
     especie VARCHAR(30) NOT NULL,

     raca_id BIGINT,
     sexo VARCHAR(20) NOT NULL,
     porte VARCHAR(20) NOT NULL,

     data_nascimento DATE,

     observacao TEXT,

     cliente_id BIGINT NOT NULL,

     data_cadastro TIMESTAMP,
     data_atualizacao TIMESTAMP,

     ativo BOOLEAN NOT NULL DEFAULT TRUE,

     CONSTRAINT fk_pet_raca
         FOREIGN KEY (raca_id)
             REFERENCES raca(id),

     CONSTRAINT fk_pet_cliente
         FOREIGN KEY (cliente_id)
             REFERENCES cliente(id)
);

INSERT INTO raca (nome, especie) VALUES
     ('Golden Retriever', 'CACHORRO'),
     ('Shih Tzu', 'CACHORRO'),
     ('Spitz Alemão', 'CACHORRO'),
     ('Yorkshire Terrier', 'CACHORRO'),
     ('Pit Bull', 'CACHORRO'),
     ('Cane Corso', 'CACHORRO'),
     ('Chihuahua', 'CACHORRO'),
     ('Bulldog Francês', 'CACHORRO'),
     ('Bulldog Inglês', 'CACHORRO'),
     ('Cocker Spaniel', 'CACHORRO'),
     ('SRD', 'CACHORRO'),
     ('Poodle', 'CACHORRO'),
     ('Lhasa Apso', 'CACHORRO'),
     ('Maltês', 'CACHORRO'),
     ('Pug', 'CACHORRO'),
     ('Dachshund', 'CACHORRO'),
     ('Beagle', 'CACHORRO'),
     ('Border Collie', 'CACHORRO'),
     ('Pastor Alemão', 'CACHORRO'),
     ('Schnauzer', 'CACHORRO'),
     ('Labrador Retriever', 'CACHORRO'),
     ('Chow Chow', 'CACHORRO'),
     ('Fox Paulistinha', 'CACHORRO'),
     ('Cavalier King Charles Spaniel', 'CACHORRO'),
     ('Pinscher', 'CACHORRO'),
     ('Rottweiler', 'CACHORRO'),
     ('American Bully', 'CACHORRO'),
     ('Husky Siberiano', 'CACHORRO');

INSERT INTO raca (nome, especie) VALUES
     ('Persa', 'GATO'),
     ('Siamês', 'GATO'),
     ('Maine Coon', 'GATO'),
     ('Angorá', 'GATO'),
     ('SRD', 'GATO');

INSERT INTO raca (nome, especie) VALUES
    ('Porquinho-da-Índia', 'OUTRO');