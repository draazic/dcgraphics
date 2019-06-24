export interface User{
    name:String;
    password:String;
    email:String;
    bio:String;
    isAdmin:State;

}
export enum State{
    admin=0,
    done=1
}