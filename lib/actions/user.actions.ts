'use server';

import { cookies } from 'next/headers';
import { ID } from 'node-appwrite';
import { createAdminClient, createSessionClient } from '../appwrite'
import { parseStringify } from '../utils';

export const signIn = async ({ email, password }: signInProps) => {
    try {
        const { account } = await createAdminClient();

        const response = await account.createEmailPasswordSession(email, password);

        cookies().set("appwrite-session", response.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(response);
    } catch (error) {
        console.error('Sign In Error', error);
    }
}

export const signUp = async (userData: SignUpParams) => {
    try {
        const { account } = await createAdminClient();

        const { email, password, firstName, lastName } = userData;

        const newUserAccout = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(newUserAccout);

    } catch (error) {
        console.error('SingUp Error', error);
    }
}

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const user = await account.get();
        return parseStringify(user);
    } catch (error) {
        // console.error("Error", error);
        return null;
    }
}

export const logoutAccount = async () => {
    try {
        const { account } = await createSessionClient();
        cookies().delete("appwrite-session");
        await account.deleteSession('current');
    } catch (error) {
        return null;
    }
};