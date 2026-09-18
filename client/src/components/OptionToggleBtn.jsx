export default function OptionToggleBtn({ enabled, onClick, onIcon, offIcon, label }) {
  const OnIcon = onIcon;
  const OffIcon = offIcon;

  return (
    <button
      type="button"
      className={`option-btn${enabled ? " is-on" : ""}`}
      onClick={onClick}
      aria-pressed={!enabled}
      aria-label={label}
      title={label}
    >
      {enabled ? <OnIcon fontSize="inherit" /> : <OffIcon fontSize="inherit" />}
    </button>
  );
}
