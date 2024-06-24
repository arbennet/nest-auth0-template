import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserProfile } from './model/user-profile';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

/**
 * This service is used to interact with the Auth0 management api
 * to fetch user data
 */
@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) protected readonly cacheManager,
  ) {}

  /**
   * TODO: replace with real logic
   * https://auth0.com/docs/secure/tokens/access-tokens/management-api-access-tokens/get-management-api-access-tokens-for-production
   */
  getAccessToken(): string {
    return this.configService.get('AUTH0_MANAGEMENT_API_TOKEN');
  }

  async findOne(id: string): Promise<UserProfile> {
    const cachedUser = await this.cacheManager.get(id);
    if (cachedUser) return cachedUser;

    const url = this.configService.get('AUTH0_MANAGEMENT_API_URL');

    const token = this.getAccessToken();
    const user = await this.httpService.axiosRef.get(`${url}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    this.cacheManager.set(id, user.data, 100000);
    return user.data;
  }
}
