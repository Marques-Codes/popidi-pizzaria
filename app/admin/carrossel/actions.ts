"use server";

import { randomUUID } from "node:crypto";
import { del, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  getHeroCarouselSlides,
  saveHeroCarouselSlides,
  sortHeroCarouselSlides,
} from "@/lib/hero-carousel-storage";
import type { HeroCarouselSlide } from "@/data/hero-carousel-slides";

const maxImageSizeInBytes = 5 * 1024 * 1024;

function getFileExtension(fileName: string) {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (!extension) {
    return "jpg";
  }

  return extension;
}

function normalizeText(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

function normalizeOrder(slides: HeroCarouselSlide[]) {
  return sortHeroCarouselSlides(slides).map((slide, index) => ({
    ...slide,
    order: index + 1,
  }));
}

function canDeleteOrDeactivateSlide(
  slides: HeroCarouselSlide[],
  targetSlide: HeroCarouselSlide,
) {
  const activeSlides = slides.filter((slide) => slide.isActive);

  if (!targetSlide.isActive) {
    return true;
  }

  return activeSlides.length > 2;
}

function isRemoteBlobImage(imageUrl: string) {
  return imageUrl.startsWith("http://") || imageUrl.startsWith("https://");
}

async function uploadCarouselImage(image: File) {
  const fileExtension = getFileExtension(image.name);
  const imagePath = `hero/${Date.now()}-${randomUUID()}.${fileExtension}`;

  return put(imagePath, image, {
    access: "public",
    addRandomSuffix: false,
  });
}

function revalidateCarouselPages() {
  revalidatePath("/");
  revalidatePath("/admin/carrossel");
}

export async function createHeroCarouselSlide(formData: FormData) {
  const title = normalizeText(formData.get("title"));
  const alt = normalizeText(formData.get("alt"));
  const image = formData.get("image");

  if (!title) {
    redirect("/admin/carrossel/nova?error=title");
  }

  if (!(image instanceof File) || image.size === 0) {
    redirect("/admin/carrossel/nova?error=image");
  }

  if (!image.type.startsWith("image/")) {
    redirect("/admin/carrossel/nova?error=file-type");
  }

  if (image.size > maxImageSizeInBytes) {
    redirect("/admin/carrossel/nova?error=file-size");
  }

  const slides = await getHeroCarouselSlides();
  const orderedSlides = sortHeroCarouselSlides(slides);

  const nextOrder =
    orderedSlides.length === 0
      ? 1
      : Math.max(...orderedSlides.map((slide) => slide.order)) + 1;

  const blob = await uploadCarouselImage(image);

  const newSlide: HeroCarouselSlide = {
    id: randomUUID(),
    title,
    image: blob.url,
    alt: alt || title,
    isActive: true,
    order: nextOrder,
  };

  await saveHeroCarouselSlides([...orderedSlides, newSlide]);

  revalidateCarouselPages();

  redirect("/admin/carrossel");
}

export async function updateHeroCarouselSlide(formData: FormData) {
  const slideId = normalizeText(formData.get("slideId"));
  const title = normalizeText(formData.get("title"));
  const alt = normalizeText(formData.get("alt"));
  const image = formData.get("image");

  if (!slideId) {
    redirect("/admin/carrossel");
  }

  if (!title) {
    redirect(`/admin/carrossel/${slideId}/editar?error=title`);
  }

  const slides = await getHeroCarouselSlides();
  const targetSlide = slides.find((slide) => slide.id === slideId);

  if (!targetSlide) {
    redirect("/admin/carrossel");
  }

  let nextImageUrl = targetSlide.image;

  if (image instanceof File && image.size > 0) {
    if (!image.type.startsWith("image/")) {
      redirect(`/admin/carrossel/${slideId}/editar?error=file-type`);
    }

    if (image.size > maxImageSizeInBytes) {
      redirect(`/admin/carrossel/${slideId}/editar?error=file-size`);
    }

    const blob = await uploadCarouselImage(image);
    nextImageUrl = blob.url;

    if (isRemoteBlobImage(targetSlide.image)) {
      try {
        await del(targetSlide.image);
      } catch {
        // Se falhar, apenas mantemos o arquivo antigo no Blob.
        // Depois podemos criar limpeza manual de arquivos órfãos.
      }
    }
  }

  const updatedSlides = slides.map((slide) => {
    if (slide.id !== slideId) {
      return slide;
    }

    return {
      ...slide,
      title,
      alt: alt || title,
      image: nextImageUrl,
    };
  });

  await saveHeroCarouselSlides(normalizeOrder(updatedSlides));

  revalidateCarouselPages();

  redirect("/admin/carrossel");
}

export async function toggleHeroCarouselSlideStatus(formData: FormData) {
  const slideId = normalizeText(formData.get("slideId"));

  if (!slideId) {
    redirect("/admin/carrossel");
  }

  const slides = await getHeroCarouselSlides();
  const targetSlide = slides.find((slide) => slide.id === slideId);

  if (!targetSlide) {
    redirect("/admin/carrossel");
  }

  if (targetSlide.isActive && !canDeleteOrDeactivateSlide(slides, targetSlide)) {
    redirect("/admin/carrossel?error=min-active");
  }

  const updatedSlides = slides.map((slide) => {
    if (slide.id !== slideId) {
      return slide;
    }

    return {
      ...slide,
      isActive: !slide.isActive,
    };
  });

  await saveHeroCarouselSlides(normalizeOrder(updatedSlides));

  revalidateCarouselPages();

  redirect("/admin/carrossel");
}

export async function deleteHeroCarouselSlide(formData: FormData) {
  const slideId = normalizeText(formData.get("slideId"));

  if (!slideId) {
    redirect("/admin/carrossel");
  }

  const slides = await getHeroCarouselSlides();
  const targetSlide = slides.find((slide) => slide.id === slideId);

  if (!targetSlide) {
    redirect("/admin/carrossel");
  }

  if (!canDeleteOrDeactivateSlide(slides, targetSlide)) {
    redirect("/admin/carrossel?error=min-active");
  }

  const remainingSlides = slides.filter((slide) => slide.id !== slideId);

  if (isRemoteBlobImage(targetSlide.image)) {
    try {
      await del(targetSlide.image);
    } catch {
      // Mesmo se a exclusão do arquivo falhar, removemos do carrossel.
    }
  }

  await saveHeroCarouselSlides(normalizeOrder(remainingSlides));

  revalidateCarouselPages();

  redirect("/admin/carrossel");
}

export async function moveHeroCarouselSlide(formData: FormData) {
  const slideId = normalizeText(formData.get("slideId"));
  const direction = normalizeText(formData.get("direction"));

  if (!slideId) {
    redirect("/admin/carrossel");
  }

  const slides = await getHeroCarouselSlides();
  const orderedSlides = normalizeOrder(slides);
  const currentIndex = orderedSlides.findIndex((slide) => slide.id === slideId);

  if (currentIndex === -1) {
    redirect("/admin/carrossel");
  }

  const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

  if (targetIndex < 0 || targetIndex >= orderedSlides.length) {
    redirect("/admin/carrossel");
  }

  const reorderedSlides = [...orderedSlides];
  const currentSlide = reorderedSlides[currentIndex];
  const targetSlide = reorderedSlides[targetIndex];

  reorderedSlides[currentIndex] = targetSlide;
  reorderedSlides[targetIndex] = currentSlide;

  await saveHeroCarouselSlides(normalizeOrder(reorderedSlides));

  revalidateCarouselPages();

  redirect("/admin/carrossel");
}