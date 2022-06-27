import { Response, Request } from "express";
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
    console.log(error);
    res
      .status(500)
      .json({ ok: false, message: "Comunicate con el administrador" });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const category = await Category.findOne({ name });

    if (category) {
      return res
        .status(400)
        .json({ ok: false, message: "Esta categoria ya existe" });
    }

    const categoryNew = new Category(req.body);
    const categorySave = await categoryNew.save();

    res.status(200).json({
      ok: true,
      message: "Categoria creada",
      category: categorySave,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, message: "Comunicate con el administrador" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  const { id } = req.params;

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res
        .status(400)
        .json({ ok: false, message: "Esta categoria no existe" });
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
    console.log(error);
    res
      .status(500)
      .json({ ok: false, message: "Comunicate con el administrador" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res
        .status(400)
        .json({ ok: false, message: "Esta categoria no existe" });
    }

    await Category.findByIdAndDelete(id);

    res.status(200).json({
      ok: true,
      message: "Categoria eliminada",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, message: "Comunicate con el administrador" });
  }
};
