import express from 'express';
import ClientController from '../controllers/ClienteController';
import validateClient from '../middlewares/validateCliente';

const router = express.Router();
const clientController = new ClientController();

router.get('/', clientController.getAll);
router.get('/:id', clientController.getById);
router.post('/', validateClient, clientController.create);
router.put('/:id', validateClient, clientController.update);
router.delete('/:id', clientController.delete);

export default router;

