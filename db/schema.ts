import { sqliteTable, text, integer, real, primaryKey } from "drizzle-orm/sqlite-core";
import { on } from "events";
/*  TABLAS PARA EL AUTH*/
export const userTable = sqliteTable("user", {
	id: text("id").notNull().primaryKey(),
    username: text("username").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
	role: text("role", {enum: ["user", "sales"]}).notNull().default("user"),
});

export const sessionTable = sqliteTable("session", {
	id: text("id").notNull().primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer("expires_at").notNull()
});
 /* TABLAS PARA LAS ORDENES Y PRODUCTOS*/
export const productTable = sqliteTable("product", {
	id: text("id").notNull().primaryKey(),
	name: text("name").notNull(),
	description: text("description").notNull(),
	unitPrice: real("price").notNull(),
});

export const orderTable = sqliteTable("order", {
	id: text("id").notNull().primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	orderDate: integer("order_date").notNull(),
	fullfiledDate: integer("fullfiled_date"),
	totalPrice: integer("total_price").notNull(),
});

export const orderProductTable = sqliteTable("order_product", {
	orderId: text("order_id")
		.notNull()
		.references(() => orderTable.id),
	productId: text("product_id")
		.notNull()
		.references(() => productTable.id),
	quantity: integer("quantity").notNull(),	
}, (table) => { return {
		pk: primaryKey({ columns: [table.orderId, table.productId] }),}
});
