import { getSupabaseAdminClient } from "@/lib/supabase-admin";

export type MenuProduct = {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string | null;
  priceCents: number;
  promotionalPriceCents: number | null;
  promotionLabel: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  featuredOrder: number;
};

type MenuProductRow = {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string | null;
  price_cents: number;
  promotional_price_cents: number | null;
  promotion_label: string | null;
  image_url: string | null;
  image_alt: string | null;
  is_active: boolean;
  is_featured: boolean;
  display_order: number;
  featured_order: number;
};

type CreateMenuProductInput = {
  categoryId: string;
  name: string;
  description: string | null;
  priceCents: number;
  promotionalPriceCents: number | null;
  promotionLabel: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
};

type UpdateMenuProductInput = {
  id: string;
  categoryId: string;
  name: string;
  description: string | null;
  priceCents: number;
  promotionalPriceCents: number | null;
  promotionLabel: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
};

type UpdateMenuProductOrderInput = {
  id: string;
  order: number;
};

function mapProductRowToProduct(row: MenuProductRow): MenuProduct {
  return {
    id: row.id,
    categoryId: row.category_id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    priceCents: row.price_cents,
    promotionalPriceCents: row.promotional_price_cents,
    promotionLabel: row.promotion_label,
    imageUrl: row.image_url,
    imageAlt: row.image_alt,
    isActive: row.is_active,
    isFeatured: row.is_featured,
    order: row.display_order,
    featuredOrder: row.featured_order,
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

function getNextFeaturedOrder(products: MenuProduct[]) {
  const featuredProducts = products.filter((product) => product.isFeatured);

  if (featuredProducts.length === 0) {
    return 1;
  }

  return Math.max(...featuredProducts.map((product) => product.featuredOrder)) + 1;
}

export function sortMenuProducts(products: MenuProduct[]) {
  return [...products].sort((firstProduct, secondProduct) => {
    if (firstProduct.order !== secondProduct.order) {
      return firstProduct.order - secondProduct.order;
    }

    return firstProduct.name.localeCompare(secondProduct.name, "pt-BR");
  });
}

export function sortFeaturedMenuProducts(products: MenuProduct[]) {
  return [...products].sort((firstProduct, secondProduct) => {
    if (firstProduct.featuredOrder !== secondProduct.featuredOrder) {
      return firstProduct.featuredOrder - secondProduct.featuredOrder;
    }

    if (firstProduct.order !== secondProduct.order) {
      return firstProduct.order - secondProduct.order;
    }

    return firstProduct.name.localeCompare(secondProduct.name, "pt-BR");
  });
}

export async function getMenuProducts() {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("menu_products")
    .select(
      "id,category_id,name,slug,description,price_cents,promotional_price_cents,promotion_label,image_url,image_alt,is_active,is_featured,display_order,featured_order",
    )
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Erro ao buscar produtos: ${error.message}`);
  }

  const rows = (data ?? []) as MenuProductRow[];

  return rows.map(mapProductRowToProduct);
}

export async function getFeaturedMenuProducts() {
  const products = await getMenuProducts();

  return sortFeaturedMenuProducts(
    products.filter((product) => product.isActive && product.isFeatured),
  );
}

export async function getMenuProductById(productId: string) {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("menu_products")
    .select(
      "id,category_id,name,slug,description,price_cents,promotional_price_cents,promotion_label,image_url,image_alt,is_active,is_featured,display_order,featured_order",
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
    promotional_price_cents: input.promotionalPriceCents,
    promotion_label: input.promotionLabel,
    image_url: input.imageUrl,
    image_alt: input.imageAlt,
    is_active: true,
    is_featured: false,
    display_order: nextOrder,
    featured_order: 1,
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
      promotional_price_cents: input.promotionalPriceCents,
      promotion_label: input.promotionLabel,
      image_url: input.imageUrl,
      image_alt: input.imageAlt,
      updated_at: new Date().toISOString(),
    })
    .eq("id", input.id);

  if (error) {
    throw new Error(`Erro ao atualizar produto: ${error.message}`);
  }
}

export async function updateMenuProductsOrderRecord(
  products: UpdateMenuProductOrderInput[],
) {
  const supabase = getSupabaseAdminClient();

  for (const product of products) {
    const { error } = await supabase
      .from("menu_products")
      .update({
        display_order: product.order,
        updated_at: new Date().toISOString(),
      })
      .eq("id", product.id);

    if (error) {
      throw new Error(`Erro ao atualizar ordem do produto: ${error.message}`);
    }
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

export async function toggleMenuProductFeaturedRecord(productId: string) {
  const product = await getMenuProductById(productId);

  if (!product) {
    throw new Error("Produto não encontrado.");
  }

  const products = await getMenuProducts();
  const supabase = getSupabaseAdminClient();

  const nextIsFeatured = !product.isFeatured;
  const nextFeaturedOrder = nextIsFeatured
    ? getNextFeaturedOrder(products)
    : product.featuredOrder;

  const { error } = await supabase
    .from("menu_products")
    .update({
      is_featured: nextIsFeatured,
      featured_order: nextFeaturedOrder,
      updated_at: new Date().toISOString(),
    })
    .eq("id", productId);

  if (error) {
    throw new Error(`Erro ao alterar destaque do produto: ${error.message}`);
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