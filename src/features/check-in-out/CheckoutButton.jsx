import Button from "../../ui/Button";
import PropTypes from "prop-types";
import { useCheckOut } from "./useCheckOut";

CheckoutButton.propTypes = {
  bookingId: PropTypes.number,
};

function CheckoutButton({ bookingId }) {
  const { checkOut, isCheckingOut } = useCheckOut();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkOut(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
