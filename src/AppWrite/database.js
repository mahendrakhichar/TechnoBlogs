import { Client, Databases, Storage, ID, Query } from "appwrite";
import Config from "../Config/Config";
import { configs } from "eslint-plugin-react";

class Service{
    client = new Client();
    databases;
    storage;
    constructor(){
        this.client
        .setEndpoint(Config.appWriteUrl)
        .setProject(Config.appWriteProjectId)
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async CreatePost ({title, slug, featuedImage, status, userId}) {
        try{
            return await this.databases.createDocument(
                Config.appWriteDatabaseId,
                Config.appWriteCollectionId,
                slug,
                {
                    title,
                    slug, 
                    featuedImage, 
                    status,
                    userId,
                }
            )
        }
        catch(error){
            console.log("appwrite Service:: createPost :: error:",error);
        }
    }
    async UpdatePost(slug,{title, featuedImage, status, userId}){
        try{
            return await this.databases.updateDocument(
                Config.appWriteDatabaseId,
                Config.appWriteCollectionId,
                slug,
                {
                    title,
                    featuedImage,
                    status,

                }
            )
        }
        catch(error){
            console.log("appwrite Service:: updatePost :: error:",error);
        }
    }
    async DeletePost(slug){
        try{
            await this.databases.deleteDocument(
                Config.appWriteDatabaseId,
                Config.appWriteCollectionId,
                slug,
            )
            return true;
        }
        catch(error){
            console.log("appwrite Service:: updatePost :: error:",error);
            return false;
        }
    }
    async GetPost(slug){
        try{
            return await this.databases.getDocument(
                Config.appWriteDatabaseId,
                Config.appWriteCollectionId,
                slug,
            )
        }
        catch(error){
            console.log("appwrite Service:: GetPost :: error:",error);
        }
    }
    async Getposts(queries = [Query.equal("Status","active")]){
        try{
            return await this.databases.listDocuments(
                Config.appWriteDatabaseId,
                Config.appWriteCollectionId,
                queries,
            )
        }
        catch(error){
            console.log("appwrite Service:: GetPosts :: error:",error);
        }
    }

    // file service
    async UploadFile(file){
        try {
            await this.storage.createFile(
                Config.appWriteBucketId,
                ID.unique(),
                file,
            );
            return true;
        } catch (error) {
            console.log("appwrite Service:: uploadFile :: error:",error);
            return false;
        }
    }
    async DeleteFile(fileId){
        try {
            await this.storage.deleteFile(
                Config.appWriteBucketId,
                fileId,
            )
        } catch (error) {
            console.log("appwrite Service:: deleteFile :: error:",error);
            return false;
        }
    }
    getFilePreview(fileId){
        return this.storage.getFilePreview(
            Config.appWriteBucketId,
            fileId,
        )
    }
}

const service = new Service();

export default Service;
