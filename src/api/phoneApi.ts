// src/api/phoneApi.ts
import { PHONES, COLOR_ORDER } from "../data/phones";
import { Phone } from "../types";

export const API_URL = (process.env.EXPO_PUBLIC_API_URL ?? "").replace(/\/$/, "");
export const USING_API = API_URL !== "";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchPhone(id: string): Promise<Phone> {
  if (!USING_API) {
    // Chế độ offline: giả lập độ trễ để thấy vòng xoay Loading
    await sleep(600);
    const p = PHONES.find((x) => x.id === id);
    if (!p) throw new Error("Không tìm thấy sản phẩm");
    return p;
  }

  const res = await fetch(`${API_URL}/phones/${id}`);
  if (!res.ok) {
    throw new Error(`Máy chủ trả về lỗi HTTP ${res.status}`);
  }

  const data = await res.json();

  // Bù đắp dữ liệu an toàn phòng khi MockAPI tạo thiếu trường:
  return {
    id: String(data.id ?? "1"),
    name: data.name ?? "Điện Thoại Vsmart Joy 3 - Hàng chính hãng",
    price: Number(data.price ?? 1790000),
    oldPrice: Number(data.oldPrice ?? 1790000),
    rating: Number(data.rating ?? 5),
    reviewCount: Number(data.reviewCount ?? 828),
    supplier: data.supplier ?? "Tiki Tradding",
    badge: data.badge ?? "Ở ĐÂU RẺ HƠN HOÀN TIỀN",
    colors: Array.isArray(data.colors) && data.colors.length > 0 ? data.colors : COLOR_ORDER,
    defaultColor: data.defaultColor ?? "blue",
  };
}