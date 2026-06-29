import * as ImagePicker from "expo-image-picker";

import { api } from "./api";

function getFileName(uri: string) {
  return uri.split("/").pop() || `image-${Date.now()}.jpg`;
}

function getMimeType(fileName: string) {
  const lower = fileName.toLowerCase();

  if (lower.endsWith(".png")) {
    return "image/png";
  }

  if (lower.endsWith(".webp")) {
    return "image/webp";
  }

  return "image/jpeg";
}

export async function pickAndUploadImage() {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    throw new Error("Permissao para acessar a galeria negada.");
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    quality: 0.85,
  });

  if (result.canceled || !result.assets[0]) {
    return null;
  }

  const asset = result.assets[0];
  const name = asset.fileName ?? getFileName(asset.uri);
  const uploaded = await api.uploadImage({
    uri: asset.uri,
    name,
    type: asset.mimeType ?? getMimeType(name),
  });

  return uploaded.url;
}
