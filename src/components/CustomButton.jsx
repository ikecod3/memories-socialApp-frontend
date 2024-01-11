// Disable ESLint for prop-types to accommodate flexibility in component usage
/* eslint-disable react/prop-types */
// Disable ESLint for unused variables since not all props might be used in every instance
/* eslint-disable no-unused-vars */

/**
 * CustomButton component for creating flexible and styled buttons.
 *
 * -props {string} title - The text content of the button.
 * -props {string} containerStyles - Additional styles for the button container.
 * -props {ReactNode} iconRight - Optional icon to be displayed to the right of the text.
 * -props {string} type - The type of button (e.g., "button", "submit").
 * -props {function} onClick - function to be executed when the button is clicked.
 *-
 * -returns {JSX.Element} - The rendered CustomButton component.
 */
const CustomButton = ({ title, containerStyles, iconRight, type, onClick }) => {
  return (
    <button
      onClick={onClick}
      type={type || "button"}
      className={`inline-flex items-center text-base ${containerStyles}`}
    >
      {title}

      {iconRight && <div className="ml-2">{iconRight}</div>}
    </button>
  );
};

export default CustomButton;
