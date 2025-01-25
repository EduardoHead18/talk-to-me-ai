export const Modal : React.FC<ModalProps> = ({title, description, action}) => {
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
    
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">
            {description}
          </p>
          <div className="flex flex-row justify-center">
          <div className="modal-action mr-10">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button onClick={action} className="btn">save</button>
            </form>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">cancel</button>
            </form>
          </div>
          </div>
        </div>
      </dialog>
    </>
  );
};
