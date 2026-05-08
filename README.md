# 🐶 Petshop Manager

Sistema de gerenciamento completo para pet shop desenvolvido como projeto pessoal de portfólio, com foco em **frontend moderno, arquitetura escalável e infraestrutura em cloud**.

O projeto nasce de um problema real de um negócio familiar, atualmente gerenciado via planilhas Excel, sem integração entre dados, histórico centralizado ou automação de processos.

---

## 🎯 Objetivo

O sistema tem como objetivo centralizar e automatizar as operações de um pet shop, incluindo:

- Gestão de clientes e pets
- Controle de atendimentos
- Controle automático de pacotes de serviços
- Organização de serviços avulsos
- Base para métricas operacionais e financeiras futuras

---

## 🧱 Arquitetura

O projeto é estruturado como um **monorepo**, separando claramente as responsabilidades:

- `frontend/` → Aplicação web (React)
- `backend/` → API (Spring Boot)
- `infra/` → Infraestrutura, docker e configurações

Arquitetura técnica:

- Module Architecture
- Event-driven architecture (futuro com RabbitMQ)
- Schema-first GraphQL

---

## 🧰 Stack

### Frontend
- React
- Vite
- TypeScript
- TailwindCSS
- shadcn/ui
- Apollo Client
- GraphQL
- React Router
- Vitest
- React Testing Library

### Backend
- Spring Boot
- Spring GraphQL
- Spring Security + JWT
- JPA / Hibernate
- PostgreSQL
- Flyway
- RabbitMQ
- SLF4J + Logback

### Infraestrutura
- Docker
- Docker Compose
- GitHub Actions (CI/CD)
- AWS S3 (uploads)
- Deploy em cloud

---

## 📦 Funcionalidades (em desenvolvimento)

### Autenticação
- Login com JWT
- Controle de sessão
- Proteção de rotas

### Clientes
- Cadastro
- Edição
- Listagem com filtros

### Pets
- Cadastro vinculado ao cliente
- Upload de imagem (S3)
- Edição e visualização

### Atendimentos
- Registro de serviços realizados
- Controle de pacotes
- Cálculo automático de valores (serviços avulsos)

### Pacotes
- Templates de pacotes
- Controle de saldo
- Validade automática
- Integração com atendimentos

---

## 🔔 Sistema de Notificações (em evolução)

- Alertas de pacotes próximos do fim
- Pacotes vencendo ou vencidos
- Interface com contador de notificações

---

## ⚙️ Infraestrutura

- CI/CD com GitHub Actions
- Docker para ambiente local
- Preparação para deploy em cloud
- Upload de imagens via AWS S3

---

## 📈 Objetivo Técnico

Este projeto foi construído para demonstrar:

- Capacidade de desenvolver frontend moderno e escalável
- Integração completa frontend + backend
- Uso de arquitetura profissional
- Conhecimento em cloud e CI/CD
- Organização de código em nível de produção
- Evolução incremental de produto real

---

## 🚧 Status do Projeto

Em desenvolvimento ativo — construído em versões incrementais com entregas contínuas.