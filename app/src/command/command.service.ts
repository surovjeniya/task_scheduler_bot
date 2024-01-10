import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'telegraf/typings/core/types/typegram';

@Injectable()
export class CommandService {
  constructor(private readonly userRepository: UserRepository) {}
  async validateUser(telegram_user: User) {
    const user = await this.userRepository.findOne({
      where: { telegram_id: telegram_user.id },
    });
    if (!user) {
      const newUser = this.userRepository.create({
        telegram_id: telegram_user.id,
        ...telegram_user,
      });
      await this.userRepository.save(newUser);
    }
  }
}
