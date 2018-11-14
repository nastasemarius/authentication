import mongoose from 'mongoose';

const CONNECTION_STRING = `mongodb+srv://dev:dev@cluster0-r6uvt.mongodb.net/test?retryWrites=true`;

class Database {

    public User: mongoose.Model<any>;

    constructor() {
        mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true }).then(x => {
            console.log('Connected to database');
        });
        this.User = mongoose.model('User', this.userSchema())
    }

    private userSchema() {
        return new mongoose.Schema({
            _id: mongoose.Schema.Types.ObjectId,
            username: { type: String, required: true },
            password: { type: String, required: true },
            firstName: { type: String, required: true },
            lastName: { type: String, required: true }
        });

    }
}
const DB: Database = new Database();
export default DB;