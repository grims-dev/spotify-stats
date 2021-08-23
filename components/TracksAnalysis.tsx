import useTracksAudioFeatures from '../hooks/useTracksAudioFeatures';

export default function MultipleTracksAnalysis({ accessToken, endpointOptions }) {
  const { data, isLoading, isError } = useTracksAudioFeatures(accessToken, endpointOptions);
  if (isLoading) return <>Loading...</>;
  if (isError) return <>An error occurred when connecting to Spotify. Please try reloading the page.</>;

  console.log('audio features', data.audio_features);
  if (data?.audio_features && data?.audio_features?.length > 0) {
    return (
      <>
      Acousticness
      "A measure of whether how acoustic the tracks are."
      {data.acousticness}

      Danceability
      "How suitable the tracks are is for dancing based on tempo and rhythm."
      {data.danceability}

      Average Duration
      {data.duration_ms}

      Energy
      "How energetic the tracks are based on dynamic range, perceived loudness, and timbre."
      {data.energy}

      Loudness
      "The overall loudness of the tracks based on decibels (dB)."
      {data.loudness}

      Tempo
      "The estimated tempo of the tracks in beats per minute (BPM)."
      {data.tempo}
      
      Valence
      "How positive/happy the tracks are."
      {data.valence}
      </>
    )
  }

  return <>Your authentication has expired. Please try reloading the page.</>;
}
