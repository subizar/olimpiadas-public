import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

config({ path: '.env' });

export default defineConfig({
  schema: './db/schema.ts',
  out: './migrations',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
  /*dbCredentials: {
    url: "libsql://olimpiadas-subizar.turso.io",
    authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MjM3NDM2OTMsImlkIjoiYmI5ZDI0NmEtNTZkYy00ODdmLTk0OTctMjY0OWMxM2RiMzFmIn0.Hwc-On_H5wHiTAkQeTwC0FOQfE_zoOub8MJ6lHuNtj2rK3DEaWa6OSt3hZG1XU-Nugv5cUyaBdApw-nqve00DA",
  },*/
});