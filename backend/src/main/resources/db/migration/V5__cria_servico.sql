CREATE TABLE IF NOT EXISTS servico (
    id bigserial primary key,
    nome varchar(100) not null,
    descricao text,
    preco_pequeno numeric(10,2) not null,
    preco_medio numeric(10,2) not null,
    preco_grande numeric(10,2) not null,
    data_cadastro timestamp,
    data_atualizacao timestamp,
    ativo boolean not null default true
);