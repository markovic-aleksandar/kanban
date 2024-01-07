import { useEffect, useRef } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import { delayToHandle } from '../../utils';
import { IconClose } from '../../constants/icons';

const ModalContent = ({leave, enter, title, currentEl, children}) => {
  const modalContent = useRef(null);
  const isMobile = useMediaQuery('mobile');

  useEffect(() => {
    if (!leave && enter === currentEl) {
      modalContent.current?.classList.add('fade-in');
    }

    if (leave === currentEl) {
      modalContent.current?.classList.add('fade-out');
    }

    if (leave && enter === currentEl) {
      delayToHandle(() => modalContent.current?.classList.add('fade-in'), 300);
    }
  }, [leave, enter, currentEl]);

  return (
    <div ref={modalContent} className="Modal__content">
      {isMobile && <button type="button" className="Modal__close">
        <IconClose />
      </button>}
      <h2 className="Modal__content-title">{title}</h2>
      {children}
    </div>
  )
}

export default ModalContent;