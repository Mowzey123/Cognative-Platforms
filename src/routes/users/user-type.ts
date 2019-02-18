import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserType {
    @Field()
    name: string;

    @Field()
    username: string;

    @Field()
    email: string;

    @Field()
    password: string;
}