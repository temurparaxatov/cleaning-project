import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private usersModel: Model<User>) {}
  async create(data: CreateUserDto): Promise<User> {
    const newUser = await this.usersModel.create(data);
    newUser.save();
    return newUser;
  }
  async findAll(): Promise<User[]> {
    const users = await this.usersModel.find();
    return users;
  }
  async findOne(id: string): Promise<User> {
    const user = await this.usersModel.findOne({ id });
    return user;
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.usersModel.findOne({ email });
    return user;
  }
  async updateById(id: string, data: UpdateUserDto): Promise<User> {
    const updatedUser = await this.usersModel.findOneAndUpdate(
      { id },
      { data },
      { new: true },
    );
    return updatedUser;
  }
  async deletebyId(id: string): Promise<User> {
    const deletedUser = await this.usersModel.findOneAndDelete({ id });
    return deletedUser;
  }
}
