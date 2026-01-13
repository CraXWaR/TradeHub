import Button from "../UI/Button/Button.jsx";
import {FaHeart} from "react-icons/fa";
import {FiHeart} from "react-icons/fi";
import {Modal} from "../../General/Modal.jsx";
import {useWishlist} from "../../../hooks/auth/useWishlist.js";

export const AddToWishlist = (id) => {
    const {inWishlist, isBusy, message, dismissMessage, toggleWishlist,} = useWishlist(id);

    return (<>
        <Button
            onClick={toggleWishlist}
            loading={isBusy}
            variant="full"
            size="icon"
            title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            aria-label={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            className={[
                "transition-colors disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-none",
                inWishlist
                    ? "border-orange-500 bg-orange-500 text-white"
                    : "border-orange-300 bg-white text-orange-600 hover:bg-orange-100",
                isBusy ? "animate-bounce" : "",]
                .filter(Boolean)
                .join(" ")}>
            {inWishlist ? <FaHeart size={20}/> : <FiHeart size={20}/>}
        </Button>


        <Modal open={!!message?.text} onClose={dismissMessage}>
            <h2
                className={["text-lg md:text-xl font-semibold tracking-wide mb-4", message?.type === "error" ? "text-red-700" : "text-green-700",].join(" ")}>
                {message?.type === "error" ? "Something went wrong" : "Success"}
            </h2>

            {Array.isArray(message?.text) ? (
                <ul className="text-base md:text-lg leading-relaxed text-gray-800 font-medium list-disc pl-6">
                    {message.text.map((t, i) => (<li key={i}>{t}</li>))}
                </ul>) : (<p className="text-base md:text-lg leading-relaxed text-gray-800 font-medium">
                {message?.text}
            </p>)}
        </Modal>
    </>);
}