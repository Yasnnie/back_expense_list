import { Request, Response } from 'express';
import { createExpenseModel, deleteExpenseModel, Expense, ExpenseData, getAllExpensesModel, updateExpenseModel } from '../models/expenseModel';


export const getAllExpenses = (req: Request, res: Response): void => {
    getAllExpensesModel((err: Error | null, expenses: Expense[] | null) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(expenses);
    });
};


export const createExpense = (req: Request, res: Response): void => {
    const expenseData: ExpenseData = req.body;
    createExpenseModel(expenseData, (err: Error | null, id: number | null) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const newExpense: Expense = { id: id || 0, ...expenseData };
        res.json(newExpense);
    });
};


export const updateExpense = (req: Request, res: Response): void => {
    const id: number = parseInt(req.params.id);
    const expenseData: ExpenseData = req.body;
    updateExpenseModel(id, expenseData, (err: Error | null) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        const updatedExpense: Expense = { id: id, ...expenseData };
        res.json(updatedExpense);
    });
};


export const deleteExpense = (req: Request, res: Response): void => {
    const id: number = parseInt(req.params.id);
    deleteExpenseModel(id, (err: Error | null, changes: number) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Despesa excluída com sucesso.', rowsAffected: changes });
    });
};
