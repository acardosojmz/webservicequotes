
import { connectorMongoDB } 
from "../config/connectors.ts";  

import { User } 
from "../interfaces/User.ts";    

export const UserModel = connectorMongoDB.collection<User>("user");

