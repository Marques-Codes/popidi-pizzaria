"use server";

import { randomUUID } from "node:crypto";
import { del, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getMenuCategories } from "@/lib/menu-storage";
import {
  createMenuProductRecord,
  deleteMenuProductRecord,
  getMenuProductById,
  toggleMenuProductStatusRecord,
  updateMenuProductRecord,
} from "@/lib/menu-product-storage";

const maxImageSizeInBytes = 5 * 1024 * 1024;

function normalizeText(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

function getFileExtension(fileName: string) {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (!extension) {
    return "jpg";
  }

  return extension;
}

function parsePriceToCents(value: string) {
  const cleanedValue = value.replace(/[^\d,.-]/g, "").trim();

  if (!cleanedValue) {
    return null;
  }

  const normalizedValue = cleanedValue.includes(",")
    ? cleanedValue.replace(/\./g, "").replace(",", ".")
    : cleanedValue;

  const price = Number(normalizedValue);

  if (!Number.isFinite(price) || price < 0) {
    return null;
  }

  return Math.round(price * 100);
}

function isRemoteBlobImage(imageUrl: string | null): imageUrl is string {
  if (!imageUrl) {
    return false;
  }

  return imageUrl.startsWith("http://") || imageUrl.startsWith("https://");
}

async function uploadProductImage(image: File) {
  const fileExtension = getFileExtension(image.name);
  const imagePath = `menu-products/${Date.now()}-${randomUUID()}.${fileExtension}`;

  return put(imagePath, image, {
    access: "public",
    addRandomSuffix: false,
  });
}

function revalidateMenuProductPages() {
  revalidatePath("/admin/cardapio");
  revalidatePath("/admin/cardapio/produtos");
  revalidatePath("/cardapio");
}

async function validateCategory(categoryId: string) {
  const categories = await getMenuCategories();

  return categories.some(
    (category) => category.id === categoryId && category.isActive,
  );
}

export async function createMenuProduct(formData: FormData) {
  const categoryId = normalizeText(formData.get("categoryId"));
  const name = normalizeText(formData.get("name"));
  const description = normalizeText(formData.get("description"));
  const price = normalizeText(formData.get("price"));
  const imageAlt = normalizeText(formData.get("imageAlt"));
  const image = formData.get("image");

  if (!categoryId) {
    redirect("/admin/cardapio/produtos/novo?error=category");
  }

  if (!name) {
    redirect("/admin/cardapio/produtos/novo?error=name");
  }

  const priceCents = parsePriceToCents(price);

  if (priceCents === null) {
    redirect("/admin/cardapio/produtos/novo?error=price");
  }

  const categoryExists = await validateCategory(categoryId);

  if (!categoryExists) {
    redirect("/admin/cardapio/produtos/novo?error=category");
  }

  let imageUrl: string | null = null;

  if (image instanceof File && image.size > 0) {
    if (!image.type.startsWith("image/")) {
      redirect("/admin/cardapio/produtos/novo?error=file-type");
    }

    if (image.size > maxImageSizeInBytes) {
      redirect("/admin/cardapio/produtos/novo?error=file-size");
    }

    const blob = await uploadProductImage(image);
    imageUrl = blob.url;
  }

  await createMenuProductRecord({
    categoryId,
    name,
    description: description || null,
    priceCents,
    imageUrl,
    imageAlt: imageAlt || name,
  });

  revalidateMenuProductPages();

  redirect("/admin/cardapio/produtos");
}

export async function updateMenuProduct(formData: FormData) {
  const productId = normalizeText(formData.get("productId"));
  const categoryId = normalizeText(formData.get("categoryId"));
  const name = normalizeText(formData.get("name"));
  const description = normalizeText(formData.get("description"));
  const price = normalizeText(formData.get("price"));
  const imageAlt = normalizeText(formData.get("imageAlt"));
  const image = formData.get("image");

  if (!productId) {
    redirect("/admin/cardapio/produtos");
  }

  if (!categoryId) {
    redirect(`/admin/cardapio/produtos/${productId}/editar?error=category`);
  }

  if (!name) {
    redirect(`/admin/cardapio/produtos/${productId}/editar?error=name`);
  }

  const priceCents = parsePriceToCents(price);

  if (priceCents === null) {
    redirect(`/admin/cardapio/produtos/${productId}/editar?error=price`);
  }

  const categoryExists = await validateCategory(categoryId);

  if (!categoryExists) {
    redirect(`/admin/cardapio/produtos/${productId}/editar?error=category`);
  }

  const product = await getMenuProductById(productId);

  if (!product) {
    redirect("/admin/cardapio/produtos");
  }

  let nextImageUrl = product.imageUrl;

  if (image instanceof File && image.size > 0) {
    if (!image.type.startsWith("image/")) {
      redirect(`/admin/cardapio/produtos/${productId}/editar?error=file-type`);
    }

    if (image.size > maxImageSizeInBytes) {
      redirect(`/admin/cardapio/produtos/${productId}/editar?error=file-size`);
    }

    const blob = await uploadProductImage(image);
    nextImageUrl = blob.url;

    const previousImageUrl = product.imageUrl;

    if (isRemoteBlobImage(previousImageUrl)) {
      try {
        await del(previousImageUrl);
      } catch {
        // Mesmo se falhar ao apagar a imagem antiga, seguimos com a nova.
      }
    }
  }

  await updateMenuProductRecord({
    id: productId,
    categoryId,
    name,
    description: description || null,
    priceCents,
    imageUrl: nextImageUrl,
    imageAlt: imageAlt || name,
  });

  revalidateMenuProductPages();

  redirect("/admin/cardapio/produtos");
}

export async function toggleMenuProductStatus(formData: FormData) {
  const productId = normalizeText(formData.get("productId"));

  if (!productId) {
    redirect("/admin/cardapio/produtos");
  }

  await toggleMenuProductStatusRecord(productId);

  revalidateMenuProductPages();

  redirect("/admin/cardapio/produtos");
}

export async function deleteMenuProduct(formData: FormData) {
  const productId = normalizeText(formData.get("productId"));

  if (!productId) {
    redirect("/admin/cardapio/produtos");
  }

  const product = await getMenuProductById(productId);

  if (!product) {
    redirect("/admin/cardapio/produtos");
  }

  const imageUrl = product.imageUrl;

  if (isRemoteBlobImage(imageUrl)) {
    try {
      await del(imageUrl);
    } catch {
      // Mesmo se falhar ao apagar a imagem, removemos o produto.
    }
  }

  await deleteMenuProductRecord(productId);

  revalidateMenuProductPages();

  redirect("/admin/cardapio/produtos");
}