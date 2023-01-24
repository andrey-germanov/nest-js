import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compare, genSaltSync, hashSync } from 'bcryptjs';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<UserModel>,
    private readonly jwtService: JwtService,
  ) {}
  async createUser(dto: AuthDto) {
    const salt = genSaltSync(8);
    const newUser = new this.UserModel({
      email: dto.login,
      passwordHash: hashSync(dto.password, salt),
    });
    return newUser.save();
  }

  async findUser(email: string) {
    return this.UserModel.findOne({ email }).exec();
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<UserModel, 'email'>> {
    console.log(email, password);
    const user = await this.findUser(email);
    if (!user) throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword)
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    return { email: user.email };
  }

  async login(email: string) {
    const payload = email;
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
