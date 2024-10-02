import { Alert } from 'react-native';
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
    endpoint: "https://cloud.appwrite.io/v1",
    platform: PLATFORM!,
    projectId: "66f4a78d0009c644a7af",
    databaseId: '66f4acad0008d83de0fc',
    usersCollectionId: "66f4ad120017cf02ae18",
    videosCollectionId: "66f4ad2d0039d5b55cc8",
    storageId: STORAGE_ID!
}

const client = new sdk.Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)


export const database = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const message = new sdk.Messaging(client);
export const account = new sdk.Account(client);
// export const id = sdk.ID.unique();
export const avatars = new sdk.Avatars(client)


//create a User
export async function createUser(email: string, password: string, username: string) {
    try {
        const newAccount = await account.create(sdk.ID.unique(), email, password, username)

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password);


        const newUser = await database.createDocument(
            config.databaseId,
            config.usersCollectionId,
            sdk.ID.unique(), {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl
        });


        return newUser

    } catch (error) {
        console.log(error);
        throw new Error('Couldnt create an account');

    }
};

export async function signIn(email: string, password: string) {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session

    } catch (error) {
        console.log(error)
        throw new Error('Couldnt create session')
    }
};

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) new Error('No account found');

        const currentUser = await database.listDocuments(
            config.databaseId,
            config.usersCollectionId,
            [sdk.Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser || currentUser.documents.length === 0) {
            throw new Error('No user document found');
        }

        return currentUser.documents[0]

    } catch (error: any) {
        console.log('Error fetching current user:', error.message);
        return null;

    }
};

export async function getAllPosts () {
    try {
        const post = await database.listDocuments(
            config.databaseId,
            config.videosCollectionId,
        )

        return post.documents
        
    } catch (error: any) {
        Alert.alert('Error:', error.message)
    }
};
export async function getLatestPosts () {
    try {
        const post = await database.listDocuments(
            config.databaseId,
            config.videosCollectionId,
            [sdk.Query.orderDesc('$createdAt'), sdk.Query.limit(7)]
        )

        return post.documents
        
    } catch (error: any) {
        Alert.alert('Error:', error.message)
    }
};