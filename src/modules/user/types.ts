import { WithId } from 'mongodb';


export type User = WithId<{
  firstName: string;
  lastName: string;
  displayName: string;
  dob: Date;
  email: string;
  phone: string;
  avatar: string;
  oauth: {
    provider: 'google';
    id: string;
  };
}>


export type UserMin = Pick<User, '_id'>
