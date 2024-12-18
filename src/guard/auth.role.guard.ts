import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
import { Roles } from 'src/decorators/role.decorator';

export function AuthRoles(...roles: Role[]) {
  return applyDecorators(UseGuards(AuthGuard, RoleGuard), Roles(...roles));
}
