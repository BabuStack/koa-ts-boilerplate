import { ObjectId } from 'mongodb';
import { getUserCollection } from './db';
import { User, UserMin } from './types';


const UserModule = {
  exists: async (id: string|ObjectId): Promise<boolean> => {
    const UserCollection = await getUserCollection();

    const user: UserMin|undefined = await UserCollection.findOne({
      _id: new ObjectId(id), 
    }, {
      projection: {
        _id: 1,
      },
    });

    return !!user;
  },
  getById: async (id: string|ObjectId): Promise<User|undefined> => {
    const UserCollection = await getUserCollection();

    return UserCollection.findOne({
      _id: new ObjectId(id), 
    }, {
      projection: {
        _id         : 1,
        firstName   : 1,
        lastName    : 1,
        displayName : 1,
        dob         : 1,
        email       : 1,
        phone       : 1,
        avatar      : 1,
      },
    });
  },
  getByIdMin: async (id: string|ObjectId): Promise<UserMin|undefined> => {
    const UserCollection = await getUserCollection();

    return UserCollection.findOne({
      _id: new ObjectId(id), 
    }, {
      projection: {
        _id: 1,
      },
    });
  },
  upsert: async (userDetails: Omit<User, '_id'>) => {
    const UserCollection = await getUserCollection();

    const result = await UserCollection.updateOne({ 
      'oauth.provider' : userDetails.oauth.provider,
      'oauth.id'       : userDetails.oauth.id,
    }, {
      $set: {
        firstName : userDetails.firstName,
        lastName  : userDetails.lastName,
        dob       : userDetails.dob,
        email     : userDetails.email,
        phone     : userDetails.phone,
        oauth     : userDetails.oauth,        
      },
    }, {
      upsert: true,
    });

    if(result.upsertedId) {
      return UserModule.getByIdMin(result.upsertedId);
    }

    throw new Error('Failed to create user');
  },
};


export default UserModule;
