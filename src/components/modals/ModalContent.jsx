import { useEffect, useRef } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import { delayToHandle } from '../../utils';
import { IconClose } from '../../constants/icons';

const ModalContent = ({leave, enter, currentEl, title, children}) => {
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
      delayToHandle(() => modalContent.current?.classList.add('fade-in'), 200);
    }
  }, [leave, enter, currentEl]);

  return (
    <div ref={modalContent} className="Modal__content">
      {isMobile && <button type="button" className="Modal__close">
        <IconClose />
      </button>}
      {title && <div className="Modal__content-header">
        <h2 className="Modal__content-title">{title}</h2>
      </div>}
      {children}
    </div>
  )
}

export default ModalContent;