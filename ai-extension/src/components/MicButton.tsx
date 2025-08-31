type Props = { listening: boolean; onClick: () => void };
const MicButton = ({ listening, onClick }: Props) => (
  <button className={`mic-btn${listening ? ' listening' : ''}`} onClick={onClick}>
    {listening ? <span role="img" aria-label="Stop">🛑</span> : <span role="img" aria-label="Mic">🎙️</span>}
  </button>
);
export default MicButton;