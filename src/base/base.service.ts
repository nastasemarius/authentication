export class BaseService {
    constructor(private serviceName) {
        console.log(`${serviceName} initalized.`)
    }
    buildUrl(...args: any[]) {
        if (args.length) {
            args.unshift(this.serviceName);
            return args.join('/')
        }
        return this.serviceName;
    }
}