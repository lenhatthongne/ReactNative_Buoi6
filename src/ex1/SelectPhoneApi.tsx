// src/ex1/SelectPhoneApi.tsx
import React, { useState, useEffect, useCallback } from "react";
import { Phone } from "../types";
import { fetchPhone } from "../api/phoneApi";
import { SelectPhoneApp } from "./SelectPhoneApp";
import { Loading } from "../components/Loading";
import { ErrorBox } from "../components/ErrorBox";

export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    setPhone(null);
    try {
      const data = await fetchPhone("1");
      setPhone(data);
    } catch (e: any) {
      console.error("Lỗi Bài 2 API:", e);
      setError(e.message ?? "Lỗi tải dữ liệu");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (error) {
    return <ErrorBox message={error} onRetry={load} />;
  }

  if (!phone) {
    return <Loading />;
  }

  return <SelectPhoneApp phone={phone} />;
}