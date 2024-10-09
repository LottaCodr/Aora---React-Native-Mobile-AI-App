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
export async function searchPosts (query: any) {
    try {
        const post = await database.listDocuments(
            config.databaseId,
            config.videosCollectionId,
            [sdk.Query.search('title', query)]
        )

        return post.documents
        
    } catch (error: any) {
        Alert.alert('Error:', error.message)
    }
};

export async function userPosts (userId: any) {
    try {
        const post = await database.listDocuments(
            config.databaseId,
            config.videosCollectionId,
            [sdk.Query.equal('creator', userId)]
        )

        return post.documents
        
    } catch (error: any) {
        Alert.alert('Error:', error.message)
    }
};


export const sigOut = async () => {
    try {
    const session = await account.deleteSession('current');
    
    return session;
    } catch (error: any) {
        Alert.alert('Error', error.message)
    }
}

export const getFilePreview = async (fileId: any, type: any) => {
    let fileUrl;

    try {
        if( type === 'video') {
fileUrl = storage.getFileView(STORAGE_ID!, fileId)
        } else if (type === 'image') {
            fileUrl = storage.getFilePreview(STORAGE_ID!, fileId, 2000, 2000, 'top', 100)

        } else {
            throw new Error ('Invalid file type')
        }

        if(!fileUrl) throw Error;

        return fileUrl
    } catch (error: any) {
        Alert.alert('FilePreview Error', error.message)
        
    }
}

export const uploadFile = async (file: any, type: any) => {
 if(!file) return;

 const { mimeType, ...all } = file
 const asset = { type: mimeType, ...all}

 try {
    const uploadedFile = await storage.createFile(
        STORAGE_ID!,
        sdk.ID.unique(),
        asset
    )

    const fileUrl = await getFilePreview(uploadedFile.$id, type)
    return fileUrl
    
 } catch (error: any) {
    Alert.alert('Upload Error', error.message)
    
 }
}

export const createVideo = async (form: any) => {
try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
        uploadFile(form.thumbnail, 'image'),
        uploadFile(form.video, 'video'),
    ])
} catch (error: any) {
    Alert.alert('Creation Error', error.message)
    
}
}