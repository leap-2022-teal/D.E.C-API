import { Request, Response } from "express";
import { products } from "./product.model";
import { ObjectId } from "mongoose";

export async function getProduct(req: Request, res: Response) {
  const { limit } = req.query;
  const { searchQuery, categoryId, categoryIds, size, color, price } = req.query as {
    searchQuery?: string;
    categoryId?: string;
    categoryIds?: string[];
    size?: string[];
    color?: string[];
    price?: string | string[];
  };
  console.log(req.query);
  const filter: any = {};

  if (color?.length) {
    filter.color = { $in: color };
  }

  if (categoryIds?.length) {
    filter.categoryId = { $in: categoryIds };
  }

  if (size?.length) {
    filter["sizes.size"] = { $in: size };
  }

  if (searchQuery?.length) {
    const qregex = new RegExp(`${searchQuery}`, "i");
    filter["name"] = qregex;
  }

  if (categoryId?.length) {
    const id = categoryId;
    filter["$or"] = [{ subCategoryId: categoryId }, { categoryId: categoryId }];
  }
  if (price?.length) {
    const priceConditions = Array.isArray(price) ? price.map(parsePriceRange) : [parsePriceRange(price)];

    if (filter["$or"]) {
      const existingCondition = filter["$or"];
      filter["$and"] = [{ $or: existingCondition }, ...priceConditions];
    } else {
      filter["$or"] = priceConditions;
    }
  }
  console.log(filter);

  const list = await products.find(filter).maxTimeMS(20000).limit(Number(limit));
  res.json(list);
}

function parsePriceRange(priceRange: string): { price: { $gte: number; $lte?: number } } {
  const [minPrice, maxPrice] = priceRange.split(" - ");
  const parsedMinPrice = priceRange && priceRange === "Over $150" ? parseInt(minPrice.split(" ")[1].substring(1), 10) : parseInt(minPrice.substring(1), 10);
  const parsedMaxPrice = priceRange && priceRange === "Over $150" ? Infinity : parseInt(maxPrice?.substring(1), 10);
  const priceCondition: { price: { $gte: number; $lte?: number } } = {
    price: {
      $gte: isNaN(parsedMinPrice) ? 0 : parsedMinPrice,
    },
  };

  if (!isNaN(parsedMaxPrice)) {
    priceCondition.price.$lte = parsedMaxPrice;
  }
  return priceCondition;
}

export async function getProductById(req: Request, res: Response) {
  const { id } = req.params;
  const one = await products.findById({ _id: id });
  res.json(one);
}
export async function createNewProduct(req: Request, res: Response) {
  const newProduct = req.body;
  await products.create(newProduct.data);
  res.sendStatus(200);
}
export async function deleteProductById(req: Request, res: Response) {
  const { id } = req.params;
  await products.findByIdAndRemove({ _id: id });
  res.json({ removedId: id });
}
export async function updateProductById(req: Request, res: Response) {
  const { id } = req.params;
  const updatedFields = req.body;
  await products.findByIdAndUpdate({ _id: id }, updatedFields);
  res.json({ updatedId: id });
}
