import { Router } from 'express';

const Route = Router();

import {Signup , Login, UpdateProfile, GetProfile} from '../controllers/authController.js';
import  {SignupValidation, LoginValidation} from '../middlewares/authValidation.js';


Route.post('/signup', SignupValidation, Signup);
Route.post('/login', LoginValidation, Login);
Route.post('/profile', GetProfile);
Route.put('/updateprofile', UpdateProfile);



export default Route;