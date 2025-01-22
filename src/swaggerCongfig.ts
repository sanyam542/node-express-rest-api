import swaggerJsDoc from "swagger-jsdoc";

export const SERVER_PORT = process.env.SERVER_PORT;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API Documentation",
      version: "1.0.0",
      description: "API documentation for the Express server",
    },
    servers: [
      {
        url: `http://localhost:${SERVER_PORT}`,
      },
    ],
  },
  apis: ["./src/router/*.ts"], // Path to the API docs (adjust based on your project structure)
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
