import '@abraham/reflection';
import { container } from 'tsyringe';
import { UserModel } from './models/userModel.js';

container.register('UserModel', {
  useValue: UserModel.new,
});
