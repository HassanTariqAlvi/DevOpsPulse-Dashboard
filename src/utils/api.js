// src/utils/api.js
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const LAMBDA_API = {
  save: `${API_BASE_URL}/lambda/save`,
  trigger: `${API_BASE_URL}/lambda/trigger`,
};
