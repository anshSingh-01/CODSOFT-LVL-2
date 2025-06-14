import { Router } from 'express';
import * as jobController from '../controllers/jobController.js';
// import * as authController from '../controllers/authController.js';
const Route = Router();
Route.post('/create', jobController.createJob);
Route.post('/all', jobController.getAllJobs);   
Route.get('/:id', jobController.getJobById);
Route.put('/update/:id', jobController.updateJob);
Route.delete('/delete/:id', jobController.deleteJob);
Route.get('/search', jobController.searchJobs);
 // Assuming you have a profile update function in authController
Route.post('/byRecruiter', jobController.getJobsByRecruiter);
Route.get('/location/:location', jobController.getJobsByLocation);
Route.post('/candidates', jobController.getUserDetail);

export default Route;