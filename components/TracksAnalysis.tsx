import Rating from '../components/Rating';
import useTracksAudioFeatures from '../hooks/useTracksAudioFeatures';
import { convertMsToMinutes, averageObjectValues } from '../lib/helpers';

export default function MultipleTracksAnalysis({ accessToken, endpointOptions }) {
  const { data, isLoading, isError } = useTracksAudioFeatures(accessToken, endpointOptions);
  if (isLoading) return <>Loading...</>;
  if (isError) return <>An error occurred when connecting to Spotify. Please try reloading the page.</>;

  if (data?.audio_features && data?.audio_features?.length > 0) {
    const keysToAverage = [
      'duration_ms',
      'tempo',
      'danceability',
      'energy',
      'loudness',
      'valence',
    ];
    const averages = averageObjectValues(data.audio_features, keysToAverage);
    return (
      <>
        Average Duration<br/>
        {convertMsToMinutes(averages.duration_ms)}<br/>

        Average Tempo<br/>
        {Math.floor(averages.tempo)} BPM<br/>

        Danceability<br/>
        "How suitable the tracks are for dancing based on tempo and rhythm."
        <Rating value={averages.danceability} maxValue={1} />

        Energy<br/>
        "How energetic the tracks are based on dynamic range, perceived loudness, and timbre."
        <Rating value={averages.energy} maxValue={1} />

        Loudness<br/>
        "The overall loudness of the tracks based on decibels (dB)."
        <Rating value={averages.loudness} maxValue={0} minValue={-60} />
        
        Valence<br/>
        "How positive/happy the tracks are."
        <Rating value={averages.valence} maxValue={1} />
      </>
    )
  }

  return <>Your authentication has expired. Please try reloading the page.</>;
}
