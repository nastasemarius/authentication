

import { Router, Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import DB from '../database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/signup', (req: Request, res: Response) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: err });
        } else {
            const user = new DB.User({ ...req.body, _id: new Types.ObjectId(), password: hash });
            user.save()
                .then((result: any) => {
                    res.status(200).json({
                        success: 'New user has been created'
                    });
                })
                .catch((error: any) => {
                    console.log(error);
                    res.status(500).json({
                        error: error
                    });
                });
        }
    });
});
router.post('/login', (req: Request, res: Response) => {
    DB.User.findOne({ username: req.body.username })
        .exec()
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password)
                    .then(() => {
                        const token: string = jwt.sign({
                            permissions: ["read", "write"],
                            username: user.username,
                            firstName: user.firstname,
                            lastName: user.lastName
                        }, 'secret', { expiresIn: '24h' });

                        res.send({
                            success: 'User password matches',
                            token
                        });
                    })
                    .catch(err => {
                        res.sendStatus(401).json({
                            error: err
                        });
                    });
            } else {
                res.sendStatus(401).json({
                    error: 'User does not exist'
                });
            }
        });
});

const AuthController: Router = router;
export default AuthController;