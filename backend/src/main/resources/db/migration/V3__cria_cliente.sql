CREATE TABLE IF NOT EXISTS cliente (
                    id bigserial primary key,
                    nome varchar(50) not null,
                    telefone varchar(11) not null,
                    instagram varchar(50),
                    endereco varchar(100),
                    data_cadastro timestamp,
                    data_atualizacao timestamp,
                    ativo boolean
);