export const baseUrl =
  import.meta.env.MODE === "development"
    ? "http://localhost:4000"
    : "/api_gate";
