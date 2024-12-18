import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UserRepository) {}
  async create(createUserDto: CreateUserDto) {
    return await this.userRepo.create(createUserDto);
  }

  async findAll() {
    return await this.userRepo.findAll();
  }

  async findOne(id: number) {
    return await this.userRepo.findOne(id);
  }

  async findByEmail(email: string) {
    return await this.userRepo.findByEmail(email);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepo.updateById(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepo.deleteById(id);
  }
}
