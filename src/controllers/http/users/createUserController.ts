import { UserModel } from '@/models/userModel.js';
import { Controller } from '@/shared/IController.js';
import { HttpHelper } from '@/utils/httpHelper.js';
import { HttpResponse } from '@/utils/httpResponse.js';
import { container } from 'tsyringe';

export class CreateUserController
  implements
    Controller<CreateUserController.Request, CreateUserController.Response>
{
  private userFactory = container.resolve<typeof UserModel.new>('UserModel');
  async handle({
    nickname,
    password,
  }: CreateUserController.Request): Promise<
    HttpResponse<CreateUserController.Response>
  > {
    const userModel = await this.userFactory(nickname, password);

    await userModel.save();

    return HttpHelper.ok({
      id: userModel.id,
      nickname: userModel.getNickname(),
      password: userModel.getPassword(),
    });
  }
}

namespace CreateUserController {
  export type Request = {
    nickname: string;
    password: string;
  };
  export type Response = {
    id: string;
    nickname: string;
    password: string;
  };
}
