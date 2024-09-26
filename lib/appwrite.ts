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
    .setPlatform(config.platform);

export const database = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const message = new sdk.Messaging(client);
export const account = new sdk.Account(client);
export const id = sdk.ID.unique();


//create a User
export const createUser = () => {
    account.create(id, 'me@email.com', 'password', 'John Doe').then(function (response) {
        console.log(response);
    }, function (error) {
        console.error(error);
    })
}
