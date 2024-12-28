import { Client, Account, ID } from "appwrite";
import Config from "../Config/Config";
class Auth{
    client = new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(Config.appWriteUrl)
            .setProject(Config.appWriteProjectId);
        this.account = new Account(this.client);
    }
    // create the accout
    async createAccout(name, email, password){
        try{
            const UserAccount =  await this.account.create(ID.unique(),name, email, password);
            if(UserAccount){
                // i want that if account created login directly
                return this.Login(email, password);
            }
            else{
                console.log("Account not created");
                return UserAccount;
            }
        }
        catch(error){
            throw error;
        }
    }
    // get the accout by login
    async Login (email, password){
        try{
            return await this.account.createEmailPasswordSession(email, password);
        }
        catch(error){
            throw error;
        }
    }
    //Logout
    async LogOut (){
        try{
            return await this.account.deleteSessions('current');
        }
        catch(error){
            throw error;
        }
    }
    // is i direclty land to the login page , get account 
    async getAccount(){
        try{
            return await this.account.get();
        }
        catch(error){
            throw error;
        }
    }
}

const User = new Auth(); 

export default Auth;