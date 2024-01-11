/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

/**
 * TextInput Component
 * A reusable input component with optional label, styles, and error handling.
 *
 * -component
 * -props {Object} props - Html Input component properties.
 * -props {string} props.type - The type of the input field (e.g., "text", "password").
 * -props {string} props.placeholder - The placeholder text for the input field.
 * -props {string} props.styles - Additional styles for the input field.
 * -props {string} props.label - The label text for the input field.
 * -props {string} props.labelStyles - Styles for the label.
 * -props {function} props.register - The form register function for controlled components.
 * -props {string} props.name - The name attribute for the input field.
 * -props {string} props.error - The error message for required fields.
 * -props {React.Ref} ref - Forwarded ref for the input element.
 *
 *
 * This cmponent when invoked returns TextInput component.
 */

const TextInput = React.forwardRef(
  (
    { type, placeholder, styles, label, labelStyles, register, name, error },
    ref
  ) => {
    return (
      <div className="w-full flex flex-col mt-2">
        {/* if label text is provided display the label with styles  */}

        {label && (
          <p className={`text-ascent-2 text-sm mb-2 ${labelStyles}`}>{label}</p>
        )}

        <div>
          {/* define normal html input element and specified styles */}
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            className={`bg-secondary rounded border border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666] ${styles}`}
            {...register}
            aria-invalid={error ? "true" : "false"}
          />
        </div>

        {/* display error message for rquired fields */}
        {error && (
          <span className="text-xs text-[#f64949fe] mt-0.5">{error}</span>
        )}
      </div>
    );
  }
);

export default TextInput;
