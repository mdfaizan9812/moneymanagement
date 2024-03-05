import { getItem } from "./localStorage";

export const isRegistration = getItem("code") === "registration";