import {Transition} from "@headlessui/react";

const ConfirmModal = ({isOpen, title, message, onConfirm, onCancel, loading}) => {
    return (<Transition show={isOpen}>
            {/* Background overlay */}
            <Transition.Child
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={!loading ? onCancel : undefined}
                />
            </Transition.Child>

            {/* Modal */}
            <Transition.Child
                enter="transition duration-300 transform"
                enterFrom="opacity-0 scale-90 translate-y-4"
                enterTo="opacity-100 scale-100 translate-y-0"
                leave="transition duration-200 transform"
                leaveFrom="opacity-100 scale-100 translate-y-0"
                leaveTo="opacity-0 scale-90 translate-y-4"
            >
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div
                        className="bg-white rounded-lg shadow-lg p-6 w-80 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Title */}
                        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

                        {/* Message */}
                        <p className="text-gray-600 mt-2">{message}</p>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
                                onClick={onCancel}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white flex items-center justify-center"
                                onClick={onConfirm}
                                disabled={loading}
                            >
                                {loading ? (<span className="flex items-center gap-2">
                    <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                      <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                      ></circle>
                      <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Deleting...
                  </span>) : ("Confirm")}
                            </button>
                        </div>
                    </div>
                </div>
            </Transition.Child>
        </Transition>);
};

export default ConfirmModal;
