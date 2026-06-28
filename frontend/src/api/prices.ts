import { apiGet } from "./client";
import type { PriceDetail } from "../types";

export async function getPrices(isbn: string): Promise<PriceDetail> {
  return apiGet<PriceDetail>(`/api/prices/${isbn}`);
}
