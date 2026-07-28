import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AV Hall Booking API',
      version: '1.0.0',
      description: 'REST API documentation for the AV Hall Booking and Event Management System'
    },
    servers: [{ url: 'http://localhost:5000/api' }]
  },
  apis: ['./server/routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
