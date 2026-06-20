import { getSupabaseAdminClient } from "@/lib/supabase-admin";

export type MenuProduct = {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string | null;
  priceCents: number;
  imageUrl: string | null;
  imageAlt: string | null;
  isActive: boolean;
  order: number;
};

type MenuProductRow = {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string | null;
  price_cents: number;
  image_url: string | null;
  image_alt: string | null;
  is_active: boolean;
  display_order: number;
};

type CreateMenuProductInput = {
  categoryId: string;
  name: string;
  description: string | null;
  priceCents: number;
  imageUrl: string | null;
  imageAlt: string | null;
};

type UpdateMenuProductInput = {
  id: string;
  categoryId: string;
  name: string;
  description: string | null;
  priceCents: number;
  imageUrl: string | null;
  imageAlt: string | null;
};

function mapProductRowToProduct(row: MenuProductRow): MenuProduct {
  return {
    id: row.id,
    categoryId: row.category_id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    priceCents: row.price_cents,
    imageUrl: row.image_url,
    imageAlt: row.image_alt,
    isActive: row.is_active,
    order: row.display_order,
  };
}

function createSlugBase(text: string) {
  const slug = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "produto";
}

function createUniqueSlug(baseSlug: string, existingSlugs: Set<string>) {
  if (!existingSlugs.has(baseSlug)) {
    return baseSlug;
  }

  let counter = 2;
  let nextSlug = `${baseSlug}-${counter}`;

  while (existingSlugs.has(nextSlug)) {
    counter += 1;
    nextSlug = `${baseSlug}-${counter}`;
  }

  return nextSlug;
}

export async function getMenuProducts() {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("menu_products")
    .select(
      "id,category_id,name,slug,description,price_cents,image_url,image_alt,is_active,display_order",
    )
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Erro ao buscar produtos: ${error.message}`);
  }

  const rows = (data ?? []) as MenuProductRow[];

  return rows.map(mapProductRowToProduct);
}

export async function getMenuProductById(productId: string) {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("menu_products")
    .select(
      "id,category_id,name,slug,description,price_cents,image_url,image_alt,is_active,display_order",
    )
    .eq("id", productId)
    .single();

  if (error) {
    return null;
  }

  return mapProductRowToProduct(data as MenuProductRow);
}

export async function createMenuProductRecord(input: CreateMenuProductInput) {
  const supabase = getSupabaseAdminClient();
  const products = await getMenuProducts();

  const sameCategoryProducts = products.filter(
    (product) => product.categoryId === input.categoryId,
  );

  const nextOrder =
    sameCategoryProducts.length === 0
      ? 1
      : Math.max(...sameCategoryProducts.map((product) => product.order)) + 1;

  const existingSlugs = new Set(products.map((product) => product.slug));
  const slug = createUniqueSlug(createSlugBase(input.name), existingSlugs);

  const { error } = await supabase.from("menu_products").insert({
    category_id: input.categoryId,
    name: input.name,
    slug,
    description: input.description,
    price_cents: input.priceCents,
    image_url: input.imageUrl,
    image_alt: input.imageAlt,
    is_active: true,
    display_order: nextOrder,
  });

  if (error) {
    throw new Error(`Erro ao criar produto: ${error.message}`);
  }
}

export async function updateMenuProductRecord(input: UpdateMenuProductInput) {
  const supabase = getSupabaseAdminClient();

  const { error } = await supabase
    .from("menu_products")
    .update({
      category_id: input.categoryId,
      name: input.name,
      description: input.description,
      price_cents: input.priceCents,
      image_url: input.imageUrl,
      image_alt: input.imageAlt,
      updated_at: new Date().toISOString(),
    })
    .eq("id", input.id);

  if (error) {
    throw new Error(`Erro ao atualizar produto: ${error.message}`);
  }
}

export async function toggleMenuProductStatusRecord(productId: string) {
  const product = await getMenuProductById(productId);

  if (!product) {
    throw new Error("Produto não encontrado.");
  }

  const supabase = getSupabaseAdminClient();

  const { error } = await supabase
    .from("menu_products")
    .update({
      is_active: !product.isActive,
      updated_at: new Date().toISOString(),
    })
    .eq("id", productId);

  if (error) {
    throw new Error(`Erro ao alterar status do produto: ${error.message}`);
  }
}

export async function deleteMenuProductRecord(productId: string) {
  const supabase = getSupabaseAdminClient();

  const { error } = await supabase
    .from("menu_products")
    .delete()
    .eq("id", productId);

  if (error) {
    throw new Error(`Erro ao remover produto: ${error.message}`);
  }
}