import mongoose, { model, Schema } from "mongoose";

export interface Category{
    name: string,
    categoryId : mongoose.Schema.Types.ObjectId;
}

const categorySchema = new Schema < Category > ({
    name: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
}, {
    timestamps: { createdAt: "date", updatedAt: false },
}
)
export const category = model<Category>("Category", categorySchema);