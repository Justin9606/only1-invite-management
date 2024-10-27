import React, { useRef } from "react";
import { FocusScope, useDialog, OverlayContainer, useModal } from "react-aria";

type ModalProps = {
  title: string;
  children: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
};

const Modal: React.FC<ModalProps> = ({
  title,
  children,
  onConfirm,
  onCancel,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { modalProps } = useModal();
  const { dialogProps, titleProps } = useDialog({}, ref);

  return (
    <OverlayContainer>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={onCancel}
      >
        <FocusScope contain restoreFocus autoFocus>
          <div
            {...dialogProps}
            {...modalProps}
            ref={ref}
            className="bg-white rounded-lg shadow-lg max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 {...titleProps} className="text-lg font-semibold mb-4">
              {title}
            </h2>
            <div className="mb-6">{children}</div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={onCancel}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </FocusScope>
      </div>
    </OverlayContainer>
  );
};

export default Modal;
