import { Router } from 'express';
import { getAllExpenses, createExpense, updateExpense, deleteExpense } from '../controllers/expensesController';

const router = Router();

router.get('/expenses', getAllExpenses);
router.post('/expenses', createExpense);
router.put('/expenses/:id', updateExpense);
router.delete('/expenses/:id', deleteExpense);

export default router;
