import { createParamDecorator } from '@nestjs/common';

export const Acc = createParamDecorator((_, req) => req.account);
