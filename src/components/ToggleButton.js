

export default function ToggleButton({ isCollapse, onClick }) {
    return (
        <span className="toggleBtn" onClick={onClick}>
            <i className={isCollapse ? "fa fa-chevron-down" : "fa fa-chevron-up"}></i>
        </span>
    );
}
