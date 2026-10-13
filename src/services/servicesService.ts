import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { app } from "../firebase/config";

import type {
  CreateServiceInput,
  Service,
  UpdateServiceInput,
} from "../types/service";

const db = getFirestore(app);
const SERVICES_COLLECTION = "services";

// Проверка данных перед созданием и обновлением
function validateServiceInput(
  input: CreateServiceInput | UpdateServiceInput,
): void {
  if (input.title !== undefined) {
    const title = input.title.trim();

    if (!title) {
      throw new Error("Укажи название услуги.");
    }

    if (title.length > 120) {
      throw new Error("Название не должно превышать 120 символов.");
    }
  }

  if (input.description !== undefined) {
    if (input.description.trim().length > 500) {
      throw new Error("Описание не должно превышать 500 символов.");
    }
  }

  if (input.duration !== undefined) {
    if (!Number.isFinite(input.duration) || input.duration <= 0) {
      throw new Error("Продолжительность должна быть положительным числом.");
    }
  }

  if (input.price !== undefined) {
    if (!Number.isFinite(input.price) || input.price < 0) {
      throw new Error("Цена не может быть отрицательной.");
    }
  }

  if (input.currency !== undefined) {
    if (!input.currency.trim()) {
      throw new Error("Укажи валюту.");
    }

    if (input.currency.length > 5) {
      throw new Error("Некорректное обозначение валюты.");
    }
  }

  if (input.pricePrefix !== undefined) {
    if (input.pricePrefix.length > 30) {
      throw new Error("Слишком длинная приставка к цене.");
    }
  }

  if (input.durationPrefix !== undefined) {
    if (input.durationPrefix.length > 30) {
      throw new Error("Слишком длинная приставка к продолжительности.");
    }
  }

  if (input.order !== undefined) {
    if (!Number.isFinite(input.order)) {
      throw new Error("Порядок отображения должен быть числом.");
    }
  }

  if (input.isActive !== undefined && typeof input.isActive !== "boolean") {
    throw new Error("Некорректный статус услуги.");
  }
}

// Получить все услуги для админ-панели
export async function getAllServices(): Promise<Service[]> {
  const servicesQuery = query(
    collection(db, SERVICES_COLLECTION),
    orderBy("order", "asc"),
  );

  const snapshot = await getDocs(servicesQuery);

  return snapshot.docs.map(
    serviceDoc =>
      ({
        id: serviceDoc.id,
        ...serviceDoc.data(),
      }) as Service,
  );
}

// Получить только активные услуги для главной страницы
export async function getActiveServices(): Promise<Service[]> {
  const servicesQuery = query(
    collection(db, SERVICES_COLLECTION),
    where("isActive", "==", true),
    orderBy("order", "asc"),
  );

  const snapshot = await getDocs(servicesQuery);

  return snapshot.docs.map(
    serviceDoc =>
      ({
        id: serviceDoc.id,
        ...serviceDoc.data(),
      }) as Service,
  );
}

// Создать услугу
export async function createService(
  input: CreateServiceInput,
): Promise<string> {
  validateServiceInput(input);

  const title = input.title.trim();
  const description = input.description.trim();
  const currency = input.currency.trim();

  const serviceRef = doc(collection(db, SERVICES_COLLECTION));

  await setDoc(serviceRef, {
    ...input,
    title,
    description,
    currency,
    pricePrefix: input.pricePrefix?.trim() || "",
    durationPrefix: input.durationPrefix?.trim() || "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return serviceRef.id;
}

// Обновить услугу
export async function updateService(
  id: string,
  input: UpdateServiceInput,
): Promise<void> {
  if (!id.trim()) {
    throw new Error("Не указан ID услуги.");
  }

  validateServiceInput(input);

  const updates: Record<string, unknown> = {
    updatedAt: serverTimestamp(),
  };

  if (input.title !== undefined) {
    updates.title = input.title.trim();
  }

  if (input.description !== undefined) {
    updates.description = input.description.trim();
  }

  if (input.duration !== undefined) {
    updates.duration = input.duration;
  }

  if (input.price !== undefined) {
    updates.price = input.price;
  }

  if (input.currency !== undefined) {
    updates.currency = input.currency.trim();
  }

  if (input.pricePrefix !== undefined) {
    updates.pricePrefix = input.pricePrefix.trim();
  }

  if (input.durationPrefix !== undefined) {
    updates.durationPrefix = input.durationPrefix.trim();
  }

  if (input.order !== undefined) {
    updates.order = input.order;
  }

  if (input.isActive !== undefined) {
    updates.isActive = input.isActive;
  }

  await updateDoc(doc(db, SERVICES_COLLECTION, id), updates);
}

// Удалить услугу
export async function deleteService(id: string): Promise<void> {
  if (!id.trim()) {
    throw new Error("Не указан ID услуги.");
  }

  await deleteDoc(doc(db, SERVICES_COLLECTION, id));
}
