type Props = { suggestions: string[]; onCopy: (text: string) => void };
const SuggestionsPanel = ({ suggestions, onCopy }: Props) => (
  <div className="panel suggestions-panel">
    <span className="panel-title">Suggested responses:</span>
    <ul className="suggestions-list">
      {suggestions.length === 0
        ? <li className="placeholder">Suggestions will appear here</li>
        : suggestions.map((s, i) => (
            <li key={i} className="suggestion" onClick={() => onCopy(s)}>{s}</li>
          ))}
    </ul>
  </div>
);
export default SuggestionsPanel;