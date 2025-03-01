import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(75),
  currency: z.number().min(0.01, "Amount must be at least 0.01").max(100000),
  category: z
    .string()
    .min(3, "Category must be at least 3 characters")
    .max(100),
  date: z.string(),
});

type ExpenseFormData = z.infer<typeof schema>;

const ExpensesForm = () => {
  const [formdata, setFormDate] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(schema),
  });
  const [error, setError] = useState("");
  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      <h1 className="text-center">Expenses</h1>
      <div className="formGroup">
        <form
          className="d-flex justify-content-between"
          onSubmit={handleSubmit((data) => {
            const formattedData = {
              expense_name: data.name,
              amount: data.currency,
              category_name: data.category,
              date: data.date,
            };

            axios
              .post<ExpenseFormData>(
                "http://127.0.0.1:8000/api/expenses/",
                formattedData
              )
              .catch((err) => (setError(err.message), setFormDate(err)));

            console.log(formdata);
            reset();
          })}
        >
          <input
            {...register("name")}
            id="name"
            className="mb-3 mx-2 form-control"
            type="text"
            placeholder="Expense Name"
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}

          <input
            id="currency"
            {...register("currency", { valueAsNumber: true })}
            className="mb-3 mx-2 form-control"
            type="number" // Fixed type
            placeholder="Amount"
          />
          {errors.currency && (
            <p className="text-danger">{errors.currency.message}</p>
          )}

          <input
            {...register("category")}
            className="mb-3 mx-2 form-control"
            type="text"
            id="category"
            placeholder="Category"
          />
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}

          <input
            {...register("date")}
            id="date"
            className="mb-3 mx-2 form-control"
            type="text"
            placeholder="Date"
          />
          {errors.date && <p className="text-danger">{errors.date.message}</p>}

          <button className="btn btn-primary mb-3 text-nowrap" type="submit">
            Add Expense
          </button>
        </form>
      </div>
    </>
  );
};

export default ExpensesForm;
