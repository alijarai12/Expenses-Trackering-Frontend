import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";

interface Props {
  id: number;
}

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

const FormUpdate = ({ id }: Props) => {
  const [error, setError] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(schema),
  });

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
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
              .put(`http://127.0.0.1:8000/api/expenses/${id}/`, formattedData, {
                headers: { "Content-Type": "application/json" },
              })
              .then(() => {
                reset(); // Reset form after successful update
              })
              .catch((err) => {
                setError(err.message); // Show error if request fails
              });
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
            type="number"
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
            Update Expense
          </button>
        </form>
      </div>
    </>
  );
};

export default FormUpdate;
