import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import { env } from './env.js';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Aurai API',
      version: '1.0.0',
      description: 'API do Aurai AI - Assistente Virtual Inteligente para Clínicas',
      contact: {
        name: 'Victor Ads',
        email: 'contato@aurai.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/routes/**/*.ts'],
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
export const swaggerUi = swaggerUiExpress.serve;
export const swaggerRouter = swaggerUiExpress.setup(swaggerDocs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Aurai API Docs',
});