create table role (
                      id bigserial primary key,
                      nome varchar(50) not null unique,
                      data_cadastro timestamp,
                      data_atualizacao timestamp
);

create table usuario (
                         id bigserial primary key,
                         nome_completo varchar(255),
                         email varchar(255) unique,
                         senha varchar(255),
                         data_cadastro timestamp,
                         data_atualizacao timestamp
);

create table usuario_role (
                              usuario_id bigint not null,
                              role_id bigint not null,
                              primary key (usuario_id, role_id),
                              constraint fk_usuario foreign key (usuario_id) references usuario(id),
                              constraint fk_role foreign key (role_id) references role(id)
);

INSERT INTO role (nome) VALUES ('ADMIN');
INSERT INTO role (nome) VALUES ('USER');