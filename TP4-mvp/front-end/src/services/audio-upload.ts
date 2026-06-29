import { Audio } from "expo-av";

import { api } from "./api";

export type AudioRecordingState = {
  recording: Audio.Recording | null;
  startedAt: number | null;
};

export async function startAudioRecording(): Promise<AudioRecordingState> {
  const permission = await Audio.requestPermissionsAsync();

  if (!permission.granted) {
    throw new Error("Permita o acesso ao microfone para enviar audio.");
  }

  await Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    playsInSilentModeIOS: true,
  });

  const { recording } = await Audio.Recording.createAsync(
    Audio.RecordingOptionsPresets.HIGH_QUALITY,
  );

  return { recording, startedAt: Date.now() };
}

export async function stopAndUploadAudio(state: AudioRecordingState) {
  if (!state.recording) {
    return null;
  }

  await state.recording.stopAndUnloadAsync();
  const uri = state.recording.getURI();

  if (!uri) {
    return null;
  }

  const uploaded = await api.uploadAudio({
    uri,
    name: `audio-${Date.now()}.m4a`,
    type: "audio/m4a",
  });

  return {
    url: uploaded.url,
    durationMs: state.startedAt ? Date.now() - state.startedAt : undefined,
  };
}
