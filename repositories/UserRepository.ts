import { User } from "../interfaces/User.ts";
import  { UserModel}  from "../models/UserModel.ts";


class UserRepository { 

    async getUsers(page: number, size: number)  { 

        const cursor = UserModel.find();
        //--- paginate
        cursor.skip((page-1) * size)
                       .limit(page*size);

        return  await cursor.toArray(); 
    } 

    async getUser(userId: number) { 
        return  await UserModel.find({id: userId} ).toArray();
    } 

    async isLogin(account:string, password:string) { 
        return  await UserModel.countDocuments({account:account, password:password})>=1 ;
    } 

    async addUser(user: User) { 
        await UserModel.insertOne(user);
        return user;
    }

    async updateUser(id: number, user: User) { 
        await UserModel.updateOne(
            { "id": id},
                { $set: {
                    id: user.id, 
                    account: user.account,
                    password: user.password
                } 
            },
          );
        let userUpdated= await  this.getUser(id);
        return userUpdated;
    }

    async deleteUser(id: number) {    
        const user= await this.getUser(id) ;
        await UserModel.deleteOne({ "id": id });
        return user;
    }
} 

export default new UserRepository();
