import { ReactNode, createContext, useContext, useState } from "react";

type ProviderValues = {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handlecloseModal: () => void;
};

export const ModalContext = createContext({} as ProviderValues);

type Props = {
  children: ReactNode;
};

export const ModalProvider = ({ children }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => setIsModalOpen(true);

  const handlecloseModal = () => setIsModalOpen(false);

  const providerValues = {
    isModalOpen,
    handleOpenModal,
    handlecloseModal,
  };
  return (
    <ModalContext.Provider value={providerValues}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw Error("Modal context is not found");
  }
  return modalContext;
};
