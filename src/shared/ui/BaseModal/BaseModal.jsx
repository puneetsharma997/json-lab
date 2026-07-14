/**
 * reusable, standardized wrapper around ant design's modal component.
 * provides centralized control over modal behaviors (centered, mask closing, destruction on hide)
 * ensuring a consistent overlay experience across all application features.
 */

import { Modal } from "antd";

// Reusable ant design base modal
export const BaseModal = ({
  isOpen,
  onClose,
  title,
  children,
  footer = null,
  width = 600,
  centered = true,
  keyboard = false,
  closable = false,
  maskClosable = false,
  destroyOnHidden = true,
  className = "",
  ...restProps
}) => {
  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={onClose}
      footer={footer}
      width={width}
      centered={centered}
      keyboard={keyboard}
      closable={closable}
      mask={{ closable: maskClosable }}
      destroyOnHidden={destroyOnHidden}
      className={className}
      {...restProps}
    >
      {children}
    </Modal>
  );
};