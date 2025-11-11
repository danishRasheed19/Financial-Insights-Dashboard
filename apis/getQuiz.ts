import axios from "axios";
import { baseApi } from "./origin";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export async function getQuizQuestions(){
    baseApi.get("path to api");
}