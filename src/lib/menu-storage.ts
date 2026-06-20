import { getSupabaseAdminClient } from "@/lib/supabase-admin";

export type MenuCategory = {
  id: string;
  parentId: string | null;
  name: string;
  slug: string;
  description: string | null;
  isActive: boolean;
  order: number;
};

type MenuCategoryRow = {
  id: string;
  parent_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  is_active: boolean;
  display_order: number;
};

type CreateMenuCategoryInput = {
  parentId: string | null;
  name: string;
  description: string | null;
};

type UpdateMenuCategoryInput = {
  id: string;
  name: string;
  description: string | null;
};

function mapCategoryRowToCategory(row: MenuCategoryRow): MenuCategory {
  return {
    id: row.id,
    parentId: row.parent_id,
    name: row.name,
    slug: row.slug,
    description: row.description,
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

  return slug || "categoria";
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

export async function getMenuCategories() {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("menu_categories")
    .select("id,parent_id,name,slug,description,is_active,display_order")
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Erro ao buscar categorias: ${error.message}`);
  }

  const rows = (data ?? []) as MenuCategoryRow[];

  return rows.map(mapCategoryRowToCategory);
}

export async function getMenuCategoryById(categoryId: string) {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("menu_categories")
    .select("id,parent_id,name,slug,description,is_active,display_order")
    .eq("id", categoryId)
    .single();

  if (error) {
    return null;
  }

  return mapCategoryRowToCategory(data as MenuCategoryRow);
}

export function getParentCategories(categories: MenuCategory[]) {
  return categories.filter((category) => category.parentId === null);
}

export function getChildCategories(
  categories: MenuCategory[],
  parentId: string,
) {
  return categories
    .filter((category) => category.parentId === parentId)
    .sort(
      (firstCategory, secondCategory) =>
        firstCategory.order - secondCategory.order,
    );
}

export async function createMenuCategoryRecord(input: CreateMenuCategoryInput) {
  const supabase = getSupabaseAdminClient();
  const categories = await getMenuCategories();

  const parentCategory = input.parentId
    ? categories.find((category) => category.id === input.parentId)
    : null;

  const sameLevelCategories = categories.filter((category) => {
    if (!input.parentId) {
      return category.parentId === null;
    }

    return category.parentId === input.parentId;
  });

  const nextOrder =
    sameLevelCategories.length === 0
      ? 1
      : Math.max(...sameLevelCategories.map((category) => category.order)) + 1;

  const existingSlugs = new Set(categories.map((category) => category.slug));

  const slugBase = parentCategory
    ? createSlugBase(`${parentCategory.slug}-${input.name}`)
    : createSlugBase(input.name);

  const slug = createUniqueSlug(slugBase, existingSlugs);

  const { error } = await supabase.from("menu_categories").insert({
    parent_id: input.parentId,
    name: input.name,
    slug,
    description: input.description,
    is_active: true,
    display_order: nextOrder,
  });

  if (error) {
    throw new Error(`Erro ao criar categoria: ${error.message}`);
  }
}

export async function updateMenuCategoryRecord(input: UpdateMenuCategoryInput) {
  const supabase = getSupabaseAdminClient();

  const { error } = await supabase
    .from("menu_categories")
    .update({
      name: input.name,
      description: input.description,
      updated_at: new Date().toISOString(),
    })
    .eq("id", input.id);

  if (error) {
    throw new Error(`Erro ao atualizar categoria: ${error.message}`);
  }
}

export async function toggleMenuCategoryStatusRecord(categoryId: string) {
  const category = await getMenuCategoryById(categoryId);

  if (!category) {
    throw new Error("Categoria não encontrada.");
  }

  const supabase = getSupabaseAdminClient();

  const { error } = await supabase
    .from("menu_categories")
    .update({
      is_active: !category.isActive,
      updated_at: new Date().toISOString(),
    })
    .eq("id", categoryId);

  if (error) {
    throw new Error(`Erro ao alterar status da categoria: ${error.message}`);
  }
}

export async function deleteMenuCategoryRecord(categoryId: string) {
  const supabase = getSupabaseAdminClient();

  const { error } = await supabase
    .from("menu_categories")
    .delete()
    .eq("id", categoryId);

  if (error) {
    throw new Error(`Erro ao remover categoria: ${error.message}`);
  }
}