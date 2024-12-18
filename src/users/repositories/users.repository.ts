import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User) private usersModel: typeof User) {}

  async create(data: CreateUserDto): Promise<User> {
    return this.usersModel.create(data);
  }

  async findAll(): Promise<User[]> {
    return this.usersModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<User | null> {
    return this.usersModel.findByPk(id, { include: { all: true } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersModel.findOne({ where: { email } });
  }

  async updateById(id: number, data: UpdateUserDto): Promise<[number, User[]]> {
    return this.usersModel.update(data, { where: { id }, returning: true });
  }

  async deleteById(id: number): Promise<number> {
    return this.usersModel.destroy({ where: { id } });
  }
}
