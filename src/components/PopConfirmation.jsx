/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import CustomButton from "./CustomButton";

const PopConfirmation = ({
  onConfirm,
  onCancel,
  message,
  confirmText = "Yes",
  cancelText = "cancel",
}) => {
  return (
    <>
      <div className="flex items-center justify-center mx-auto z-40 top-10">
        <div className="fixed top-10 left-0 right-0 sm:w-full h-full flex items-center justify-center mx-auto">
          <div className="bg-secondary rounded-lg p-8 shadow-2xl border-1 ">
            <p className="text-base sm:text-lg text-ascent-2 pb-4">{message}</p>
            <div className="flex items-end justify-end mt-4 gap-5">
              <CustomButton
                onClick={onCancel}
                title={cancelText}
                containerStyles={`text-ascent-2 transition-all px-5 rounded hover:bg-[#0444a4] hover:text-white  `}
              />
              <CustomButton
                onClick={onConfirm}
                title={confirmText}
                containerStyles={`text-ascent-2 px-4 transition-all rounded hover:bg-[#0444a4] hover:text-white border-2 border-[#000] `}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopConfirmation;
