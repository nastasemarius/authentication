import Http from '../base/base.http';
import { BaseService } from '../base/base.service';
import ServiceEnum from '../base/service.enum';

class UsersService extends BaseService {
    constructor() {
        super(ServiceEnum.Users);
    }
    public findUser(username) {
        let url = this.buildUrl(username);
        return Http.get(url)
    }
}

export default new UsersService();