import { UserType, Gender } from "@prisma/client";

export class User {
  id?: string;
  name!: string;
  email!: string;
  phone!: string;
  password!: string;
  userType!: UserType;
  gender!: Gender;
  newPassword?: string;
}
