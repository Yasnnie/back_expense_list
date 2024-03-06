import { Database } from 'sqlite3';

// Criando conexão com o banco de dados SQLite
const db: Database = new Database('./src/expenseslist.db');

export interface Expense {
    id: number;
    category: string;
    value: number;
    date: string;
    description: string;
}

export interface ExpenseData {
    category: string;
    value: number;
    date: string;
    description: string;
}

export const getAllExpensesModel = (callback: (err: Error | null, expenses: Expense[] | null) => void): void => {
    db.all('SELECT * FROM expenses', (err: Error | null, rows: any[]) => {
        if (err) {
            return callback(err, null);
        }
        const expenses: Expense[] = rows.map(row => ({
            id: row.id,
            category: row.category,
            value: row.value,
            date: row.date,
            description: row.description
        }));
        callback(null, expenses);
    });
};

export const createExpenseModel = (expenseData: ExpenseData, callback: (err: Error | null, id: number | null) => void): void => {
    const { category, value, date, description } = expenseData;
    db.run(`INSERT INTO expenses (category, value, date, description) VALUES (?, ?, ?, ?)`,
        [category, value, date, description],
        function (err: Error | null) {
            if (err) {
                return callback(err, null);
            }
            callback(null, this.lastID);
        });
};


export const updateExpenseModel = (id: number, expenseData: ExpenseData, callback: (err: Error | null) => void): void => {
    const { category, value, date, description } = expenseData;
    db.run(`UPDATE expenses SET category = ?, value = ?, date = ?, description = ? WHERE id = ?`,
        [category, value, date, description, id],
        function (err: Error | null) {
            callback(err);
        });
};

export const deleteExpenseModel = (id: number, callback: (err: Error | null, changes: number) => void): void => {
    db.run(`DELETE FROM expenses WHERE id = ?`, id, function (err: Error | null) {
        if (err) {
            return callback(err, 0);
        }
        callback(null, this.changes);
    });
};
