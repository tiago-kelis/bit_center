import { v4 as uuid } from 'uuid';

export default class Id {
    static Novo(): string {
        return uuid()
    }        
   
}