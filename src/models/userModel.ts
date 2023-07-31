import crypto from 'crypto';
import argon2 from 'argon2';
import { prismaClient } from '@/utils/prisma.js';

export class UserModel {
  readonly id: string;
  private readonly prisma = prismaClient;

  private constructor(
    private _nickname: string,
    private _password: string,
    id?: string
  ) {
    this.id = id || crypto.randomUUID();
  }

  getNickname() {
    return this._nickname;
  }

  getPassword() {
    return this._password;
  }

  async setNickname(val: string) {
    const userAlreadyExists = !!(await this.prisma.user.findFirst({
      where: { id: this.id },
    }));
    if (userAlreadyExists) {
      const { nickname } = await this.prisma.user.update({
        where: {
          id: this.id,
        },
        data: {
          nickname: val,
        },
        select: {
          nickname: true,
        },
      });

      this._nickname = nickname;

      return nickname;
    }

    this._nickname = val;

    return this._nickname;
  }

  async setPassword(val: string) {
    const userAlreadyExists = !!(await this.prisma.user.findFirst({
      where: { id: this.id },
    }));

    const hash = await argon2.hash(val);

    if (userAlreadyExists) {
      const { password } = await this.prisma.user.update({
        where: {
          id: this.id,
        },
        data: {
          password: hash,
        },
        select: {
          password: true,
        },
      });

      this._password = password;

      return password;
    }

    this._password = val;

    return this._password;
  }

  async save() {
    const userAlreadyExists = !!(await this.prisma.user.findFirst({
      where: { id: this.id },
    }));

    if (userAlreadyExists) throw new Error('User Already exists, update User');

    await this.prisma.user.create({
      data: {
        id: this.id,
        nickname: this._nickname,
        password: this._password,
      },
    });
  }

  async update(props: Partial<UserModel.props>) {
    const userDoesNotExists = !(await this.prisma.user.findFirst({
      where: { id: this.id },
    }));

    if (userDoesNotExists) throw new Error('User does not exists, save User');

    const updatedUser = await this.prisma.user.update({
      where: { id: this.id },
      data: props,
    });

    this._nickname = updatedUser.nickname || this._nickname;

    this._password = updatedUser.password || this._password;
  }

  static async new(nickname: string, password: string, id?: string) {
    return new UserModel(nickname, await argon2.hash(password), id);
  }
}

namespace UserModel {
  export type props = {
    nickname: string;
    password: string;
  };
}
