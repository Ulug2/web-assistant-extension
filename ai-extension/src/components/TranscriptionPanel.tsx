type Props = { transcription: string; loading: boolean };
const TranscriptionPanel = ({ transcription, loading }: Props) => (
  <div className="panel transcription-panel">
    <span className="panel-title">Partner said:</span>
    <div className="transcription-content">
      {loading ? <span className="spinner" /> : (
        <div className="transcription-text">{transcription || <span className="placeholder">Transcription will appear here</span>}</div>
      )}
    </div>
  </div>
);
export default TranscriptionPanel;