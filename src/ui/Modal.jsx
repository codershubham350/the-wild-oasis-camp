import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import useOutsideClick from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

Modal.propTypes = {
  children: PropTypes.any,
};

Open.propTypes = {
  children: PropTypes.object,
  opens: PropTypes.string,
};

Window.propTypes = {
  children: PropTypes.element,
  name: PropTypes.string,
};

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  // Since we cannot directly pass the button event, we cloned the button here 'using react cloneElement()'
  // and we have passed the event handler here
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close, true);

  if (name !== openName) {
    return null;
  }

  // cerate portal helps in creating a portal and take out the element out of DOM element
  //(it creates as it is taken out of DOM element but is still presented there but can we called in any
  // other place/element), also helps in CSS conflicts in the same element sharing same css attributes or elements
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>

        {/* For passing the same functionality of closing Modal inside the CreateCabinForm */}
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
