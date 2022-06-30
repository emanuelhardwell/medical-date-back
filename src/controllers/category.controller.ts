import { Response, Request } from "express";
import {
  handleErrorResponse,
  handleInternalServerError,
} from "../helpers/handleError";
import Category from "../models/Category.model";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      ok: true,
      message: "Categorias obtenidas",
      categories,
    });
  } catch (error) {
    handleInternalServerError(res, error);
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const category = await Category.findOne({ name });

    if (category) {
      return handleErrorResponse(res, "Esta categoria ya existe", 400);
    }

    const categoryNew = new Category(req.body);
    const categorySave = await categoryNew.save();

    res.status(200).json({
      ok: true,
      message: "Categoria creada",
      category: categorySave,
    });
  } catch (error) {
    handleInternalServerError(res, error);
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  const { id } = req.params;

  try {
    const category = await Category.findById(id);

    if (!category) {
      return handleErrorResponse(res, "Esta categoria no existe", 400);
    }

    const categoryNew = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    res.status(200).json({
      ok: true,
      message: "Categoria actualizada",
      category: categoryNew,
    });
  } catch (error) {
    handleInternalServerError(res, error);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);

    if (!category) {
      return handleErrorResponse(res, "Esta categoria no existe", 400);
    }

    await Category.findByIdAndDelete(id);

    res.status(200).json({
      ok: true,
      message: "Categoria eliminada",
    });
  } catch (error) {
    handleInternalServerError(res, error);
  }
};
