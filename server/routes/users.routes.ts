

import { Router, Request, Response, NextFunction } from 'express';
import DB from '../database';

const router = Router();

router.get('/:username', (req: Request, res: Response) => {
    DB.User.findOne({ username: req.params.username })
        .exec()
        .then(user => {
            if(user){
                console.log(`${user.username} EXISTS`)
            }
            res.json({ username: user ? user.username : '' })
        });
});

const UserRoutes: Router = router;
export default UserRoutes;