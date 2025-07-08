import moongoose from 'mongoose';
const expenseSchema = new moongoose.Schema({
    himsId: { type: String, required: true },
    hostelId: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    receiptUrl: { type: String, required: false },
    }, {
    timestamps: true,
    });
export default moongoose.model('Expense', expenseSchema);