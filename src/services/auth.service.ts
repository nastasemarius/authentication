import Http from '../base/base.http';
import { BaseService } from '../base/base.service';
import ServiceEnum from '../base/service.enum';

class AuthService extends BaseService {
    constructor() {
        super(ServiceEnum.Auth);
    }

    login(credentials: any): Promise<any> {
        let url = this.buildUrl('login');
        return Http.post(url, credentials);
    }
    signUp(userInfo: any): Promise<any> {
        let url = this.buildUrl('signup');
        return Http.post(url, userInfo)
    }
    
}
export default new AuthService();