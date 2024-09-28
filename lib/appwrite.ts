import * as sdk from 'react-native-appwrite';

export const {
    PROJECT_ID,
    PLATFORM,
    DATABASE_ID,
    USERS_COLLECTION_ID,
    VIDEOS_COLLECTION_ID,
    STORAGE_ID,
    ENDPOINT,
} = process.env;


export const config = {
    endpoint: ENDPOINT!,
    platform: PLATFORM!,
    projectId: PROJECT_ID!,
    databaseId: DATABASE_ID!,
    usersCollectionId: USERS_COLLECTION_ID!,
    videosCollectionId: VIDEOS_COLLECTION_ID!,
    storageId: STORAGE_ID!
}

const client = new sdk.Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)


export const database = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const message = new sdk.Messaging(client);
export const account = new sdk.Account(client);
export const id = sdk.ID.unique();
export const avatars = new sdk.Avatars(client)


//create a User
export const createUser = async (email: string, password: string, username: string) => {
    try {
        const newAccount = await account.create(id, email, password, username)

        if (!newAccount) throw Error;
        await signIn(email, password);

        const avatarUrl = avatars.getInitials(username)

        const newUser = await database.createDocument(
            config.databaseId!,
            config.usersCollectionId!,
            id!, {
            accountId: newAccount.$id!,
            email,
            password,
            username,
            avatar: avatarUrl!
        });


        return newUser

    } catch (error) {
        console.log(error);
        throw new Error('Couldnt create an account');

    }
};

export const signIn = async (email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session;
    } catch (error) {
        console.log(error)
        throw new Error('Couldnt create session')
    }
};