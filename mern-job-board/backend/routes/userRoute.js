import { Router } from 'express';
import * as userController from '../controllers/userController.js';

const Route = Router();
Route.post('/application', userController.JobAvailable);
Route.post('/save', userController.SavedJobs);
Route.post('/saved', userController.GetAllSavedJobs);
Route.get('/applied/:userId', userController.showAppliedJobs);
Route.get('/all', userController.getAllJobs);
Route.put('/updateProfile', userController.UpdateProfile);  

Route.post('/profile', userController.GetProfile);
Route.post('/applied', userController.AppliedJobs);
Route.post('/getappliedjob', userController.GetAppliedJobs);
// Route.get('/jobs/:userId', userController.getJobsByUser);

export default Route;