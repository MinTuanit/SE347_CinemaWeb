import fs from "fs";
import path from "path";

// === Đọc file SQL export từ Supabase ===
const sql = fs.readFileSync("schema.sql", "utf8");

// Regex bắt các CREATE TABLE
const tableRegex = /CREATE TABLE IF NOT EXISTS\s+"public"\."(\w+)"\s*\(([\s\S]*?)\);/g;

// Mapping PostgreSQL → TypeScript type
function mapType(pgType: string): string {
  pgType = pgType.toLowerCase();
  if (pgType.includes("int")) return "number";
  if (pgType.includes("numeric") || pgType.includes("decimal")) return "number";
  if (pgType.includes("bool")) return "boolean";
  if (pgType.includes("timestamp") || pgType.includes("date")) return "Date";
  if (pgType.includes("json")) return "any";
  return "string";
}

// Capitalize tên class
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// === Parse từng bảng ===
const tables = [...sql.matchAll(tableRegex)];

if (!tables.length) {
  console.error("❌ Không tìm thấy bảng nào trong file schema.sql!");
  process.exit(1);
}

// Thư mục đầu ra
const dtoBaseDir = path.join("src", "dto");
if (!fs.existsSync(dtoBaseDir)) fs.mkdirSync(dtoBaseDir, { recursive: true });

for (const [, tableName, body] of tables) {
  const columnRegex = /"(\w+)"\s+([\w\(\)\.]+)([^,]*)/g;

  const columns = [...body.matchAll(columnRegex)].map(([_, name, type, rest]) => ({
    name,
    tsType: mapType(type),
    isNullable: /NULL/i.test(rest) && !/NOT NULL/i.test(rest),
  }));

  const dtoDir = path.join(dtoBaseDir, tableName);
  fs.mkdirSync(dtoDir, { recursive: true });

  // --- CREATE DTO ---
  const createDto = `
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsDateString } from 'class-validator';

export class Create${capitalize(tableName)}Dto {
${columns
      .map((col) => {
        const decorators: string[] = [];
        if (col.tsType === "string") decorators.push("@IsString()");
        if (col.tsType === "number") decorators.push("@IsNumber()");
        if (col.tsType === "boolean") decorators.push("@IsBoolean()");
        if (col.tsType === "Date") decorators.push("@IsDateString()");
        decorators.push(col.isNullable ? "@IsOptional()" : "@IsNotEmpty()");
        const api = col.isNullable ? "@ApiPropertyOptional()" : "@ApiProperty()";
        return `  ${api}\n  ${decorators.join("\n  ")}\n  ${col.name}: ${col.tsType}${col.isNullable ? "?" : ""};`;
      })
      .join("\n\n")}
}
`;

  // --- RESPONSE DTO ---
  const responseDto = `
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ${capitalize(tableName)}ResponseDto {
${columns
      .map(
        (col) =>
          `  ${col.isNullable ? "@ApiPropertyOptional()" : "@ApiProperty()"}\n  ${col.name}: ${col.tsType}${col.isNullable ? "?" : ""
          };`
      )
      .join("\n\n")}
}
`;

  // --- UPDATE DTO ---
  const updateDto = `
import { PartialType } from '@nestjs/swagger';
import { Create${capitalize(tableName)}Dto } from './create-${tableName}.dto';

export class Update${capitalize(tableName)}Dto extends PartialType(Create${capitalize(tableName)}Dto) {}
`;

  // Ghi file ra thư mục
  fs.writeFileSync(path.join(dtoDir, `create-${tableName}.dto.ts`), createDto.trim());
  fs.writeFileSync(path.join(dtoDir, `${tableName}-response.dto.ts`), responseDto.trim());
  fs.writeFileSync(path.join(dtoDir, `update-${tableName}.dto.ts`), updateDto.trim());
}

console.log("DTOs generated successfully in src/dto/");
