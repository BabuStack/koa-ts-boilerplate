import { getCollection } from 'src/lib/db';
import { User } from './types';


export function getUserCollection() {
  return getCollection<User>('user');
}

