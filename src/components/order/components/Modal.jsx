import { Modal } from "@mui/material"
import Image from "next/image"
import CloseIcon from '@mui/icons-material/Close';
import ButtonComponent from "./Button";

const ModalComponent = ({ open, onClose, children }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div style={{
        borderRadius: 8,
        padding: 6,
        backgroundColor: "#FFF",
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
      }}>
        <CloseIcon onClick={onClose} width={20} height={20} style={{ position: 'absolute', right: 4, top: 4, cursor: 'pointer' }} />
        {children}
        <div style={{ marginTop: 16, marginBottom: 16, height: 1, width: '100%', backgroundColor: 'gray' }}></div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ width: '100%' }}></div>
          <div style={{ width: 170 }}>
            <ButtonComponent onClick={onClose}>
              Xác nhận
            </ButtonComponent>
          </div>
          <div style={{ marginLeft: 8 }}>
            <ButtonComponent onClick={onClose} background={"#ed5565"}>
              Hủy
            </ButtonComponent>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalComponent