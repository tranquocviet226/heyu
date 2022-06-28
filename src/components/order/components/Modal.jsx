import { Modal } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import ButtonComponent from "./Button";

const ModalComponent = ({
  open,
  onConfirm,
  onClose,
  confirmText = 'Xác nhận',
  confirmBackground = 'linear-gradient(to right, #01CCA1 , #1795B5)',
  closeText = 'Hủy',
  closeBackground = '#ed5565',
  children,
  closeType = true }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div style={styles.container}>
        <CloseIcon onClick={onClose} width={20} height={20} style={styles.closeIcon} />
        {children}
        <div style={styles.line}></div>
        <div style={styles.btnContainer}>
          <div style={{ width: '100%' }}></div>
          <div style={{ width: 170 }}>
            <ButtonComponent background={confirmBackground} onClick={onConfirm}>
              {confirmText}
            </ButtonComponent>
          </div>
          <div style={{ marginLeft: 8 }}>
            <ButtonComponent onClick={onClose} background={closeBackground} primary={closeType}>
              {closeText}
            </ButtonComponent>
          </div>
        </div>
      </div>
    </Modal>
  )
}

const styles = {
  container: {
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#FFF",
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
  },
  closeIcon: { position: 'absolute', right: 4, top: 4, cursor: 'pointer' },
  line: { marginTop: 16, marginBottom: 16, height: 0.5, width: '100%', backgroundColor: 'gray' },
  btnContainer: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 8 }
}

export default ModalComponent