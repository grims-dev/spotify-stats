import Loader from './Loader';
import Rating from './Rating';
import useTracksAudioFeatures from '../hooks/useTracksAudioFeatures';
import { convertMsToMinutes, averageObjectValues } from '../lib/helpers';

export default function MultipleTracksAnalysis({ accessToken, endpointOptions }) {
  const { data, isLoading, isError } = useTracksAudioFeatures(accessToken, endpointOptions);
  if (isLoading) return <Loader />;
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
        <div className="p-4 border border-gray-500 rounded-lg">
          <h3>⏱&nbsp;&nbsp;Average Song Length</h3>
          <span className="text-base">{convertMsToMinutes(averages.duration_ms)}</span>
        </div>

        <div className="p-4 border border-gray-500 rounded-lg">
          <h3>🎵&nbsp;&nbsp;Average Tempo</h3>
          <span className="text-base">{Math.floor(averages.tempo)} beats per minute (BPM)</span>
        </div>

        <div className="p-4 border border-gray-500 rounded-lg">
          <h3>🕺&nbsp;&nbsp;Danceability</h3>
          <span className="text-base leading-none italic">"How suitable the tracks are for dancing based on tempo and rhythm."</span>
          <Rating value={averages.danceability} maxValue={1} />
        </div>

        <div className="p-4 border border-gray-500 rounded-lg">
          <h3>⚡&nbsp;&nbsp;Energy</h3>
          <span className="text-base leading-none italic">"How energetic the tracks are based on dynamic range, perceived loudness, and timbre."</span>
          <Rating value={averages.energy} maxValue={1} />
        </div>

        <div className="p-4 border border-gray-500 rounded-lg">
          <h3>🔊&nbsp;&nbsp;Loudness</h3>
          <span className="text-base leading-none italic">"The overall loudness of the tracks based on decibels (dB)."</span>
          <Rating value={averages.loudness + 60} maxValue={60} />
        </div>
        
        <div className="p-4 border border-gray-500 rounded-lg">
          <h3>😁&nbsp;&nbsp;Valence</h3>
          <span className="text-base leading-none italic">"How positive/happy the tracks are."</span>
          <Rating value={averages.valence} maxValue={1} />
        </div>
      </div>
    )
  }

  return <>Your authentication has expired. Please try reloading the page.</>;
}
