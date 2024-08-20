import { db } from "@/db";
import { hash } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";
import { userTable } from "@/db/schema";

export default async function Page() {}

export async function signup(formData: FormData){
	"use server";
	let username = formData.get("username");
	username = username as string;
	username = username.toString();
	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		return {
			error: "Invalid username"
		};
	}
	const password = formData.get("password");
	if (typeof password !== "string" || password.length < 4 || password.length > 255) {
		return {
			error: "Invalid password"
			
		};
	}

	const passwordHash = await hash(password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
	const userId = generateIdFromEntropySize(10); // 16 characters long
	console.log(userId);
	try {
		await db.insert(userTable).values({
			id: userId,
			username: username,
			passwordHash: passwordHash
		});
		console.log("user created");
	} catch (e) {
		console.log(e);
		return {
			error: "Username already in use"
		};
	}

	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/");
}
