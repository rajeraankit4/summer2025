import moongoose from 'mongoose';
const expenseSchema = new moongoose.Schema({
    email: { type: String, required: true },
    studentid: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    }, {
    timestamps: true,
    });
export default moongoose.model('messexpenses', expenseSchema);