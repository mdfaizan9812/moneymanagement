import axios from "axios";
import { getItem } from "./localStorage";

export async function POST(url, payload, isOption = false) {
    const options = {}
    if (isOption) {
        options.headers = {
            'Authorization': `Bearer ${getItem("token")}`
        }
    }
    return await axios.post(url, payload, options);
}

export async function GET(url, isOption = false) {
    const options = {}
    if (isOption) {
        options.headers = {
            'Authorization': `Bearer ${getItem("token")}`
        }
    }
    return await axios.get(url, options);
}

export async function PATCH(url, payload, isOption = false) {
    const options = {}
    if (isOption) {
        options.headers = {
            'Authorization': `Bearer ${getItem("token")}`
        }
    }
    return await axios.patch(url, payload, options);
}

export async function DELETE(url, isOption = false) {
    const options = {}
    if (isOption) {
        options.headers = {
            'Authorization': `Bearer ${getItem("token")}`
        }
    }
    return await axios.delete(url, options);
}