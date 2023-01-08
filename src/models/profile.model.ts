import { UserType, Gender } from "@prisma/client";

export class Profile {
  id?: string;
  name!: string;
  email!: string;
  phone?: string;
  oldPassword!: string;
  newPassword?: string;
  userType?: UserType;
  gender?: Gender;
}
