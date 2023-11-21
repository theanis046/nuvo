import { UserModel } from '../models/user.model';

export class IUserRepository {
  constructor(private readonly userDataSource: any) {}

  findUser(userModel: UserModel) {
    return this.userDataSource.find(userModel.username, userModel.password);
  }
}
