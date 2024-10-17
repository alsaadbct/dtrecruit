const fs = require('fs');
const path = require('path');

console.log(__dirname)
const moduleDir = path.join(__dirname, '/modules');
const outputSchemaPath = path.join(__dirname, '/schema.prisma');


const baseSchema = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
`;

const schemaFiles = fs.readdirSync(moduleDir)
  .filter((file) => file.endsWith('.prisma'))
  .map((file) => fs.readFileSync(path.join(moduleDir, file), 'utf-8'));

const combinedSchema = baseSchema + '\n\n' + schemaFiles.join('\n\n');

fs.writeFileSync(outputSchemaPath, combinedSchema);

console.log('Combined schema written to schema.prisma');
