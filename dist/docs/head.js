"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Challenge-02",
            description: "Desafio da semana VIII - Compass UOL",
            version: "1.0.0"
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: "Api - clínica veterinária",
            },
        ],
        components: {
            securitySchemes: {
                jwtAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                jwtAuth: [],
            },
        ],
        tags: [
            {
                name: "Login",
                description: "Operações para rota de Login",
            },
            {
                name: "Tutor",
                description: "Operações para rota de Tutores"
            },
            {
                name: "Pet",
                description: "Operações para rota de Pets"
            },
        ],
        paths: {},
    },
    apis: ["./src/routes/*.ts"]
};
exports.default = swaggerOptions;
