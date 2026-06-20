"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createMenuCategoryRecord,
  deleteMenuCategoryRecord,
  getChildCategories,
  getMenuCategories,
  toggleMenuCategoryStatusRecord,
  updateMenuCategoryRecord,
} from "@/lib/menu-storage";

function normalizeText(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

function normalizeParentId(value: FormDataEntryValue | null) {
  const parentId = normalizeText(value);

  if (!parentId || parentId === "main") {
    return null;
  }

  return parentId;
}

function revalidateMenuCategoryPages() {
  revalidatePath("/admin/cardapio");
  revalidatePath("/admin/cardapio/categorias");
}

export async function createMenuCategory(formData: FormData) {
  const name = normalizeText(formData.get("name"));
  const description = normalizeText(formData.get("description"));
  const parentId = normalizeParentId(formData.get("parentId"));

  if (!name) {
    redirect("/admin/cardapio/categorias/nova?error=name");
  }

  await createMenuCategoryRecord({
    parentId,
    name,
    description: description || null,
  });

  revalidateMenuCategoryPages();

  redirect("/admin/cardapio/categorias");
}

export async function updateMenuCategory(formData: FormData) {
  const categoryId = normalizeText(formData.get("categoryId"));
  const name = normalizeText(formData.get("name"));
  const description = normalizeText(formData.get("description"));

  if (!categoryId) {
    redirect("/admin/cardapio/categorias");
  }

  if (!name) {
    redirect(`/admin/cardapio/categorias/${categoryId}/editar?error=name`);
  }

  await updateMenuCategoryRecord({
    id: categoryId,
    name,
    description: description || null,
  });

  revalidateMenuCategoryPages();

  redirect("/admin/cardapio/categorias");
}

export async function toggleMenuCategoryStatus(formData: FormData) {
  const categoryId = normalizeText(formData.get("categoryId"));

  if (!categoryId) {
    redirect("/admin/cardapio/categorias");
  }

  await toggleMenuCategoryStatusRecord(categoryId);

  revalidateMenuCategoryPages();

  redirect("/admin/cardapio/categorias");
}

export async function deleteMenuCategory(formData: FormData) {
  const categoryId = normalizeText(formData.get("categoryId"));

  if (!categoryId) {
    redirect("/admin/cardapio/categorias");
  }

  const categories = await getMenuCategories();
  const children = getChildCategories(categories, categoryId);

  if (children.length > 0) {
    redirect("/admin/cardapio/categorias?error=has-children");
  }

  await deleteMenuCategoryRecord(categoryId);

  revalidateMenuCategoryPages();

  redirect("/admin/cardapio/categorias");
}