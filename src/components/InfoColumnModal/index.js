import React from "react";
import Modal from "../Modal";

const InfoColumnModal = ({ open, selectedColumn, toggleModal }) => {
  return (
    <Modal open={open} toggleModal={() => toggleModal()} title="List Info">
      {selectedColumn && (
        <div>
          <h2>{selectedColumn.title}</h2>
          <p>Describtion : {selectedColumn.description}</p>
          <p>Created At : {selectedColumn.createdAt}</p>
          <p>Last Modified : {selectedColumn.lastModified.toString()}</p>
        </div>
      )}
    </Modal>
  );
};

export default InfoColumnModal;
