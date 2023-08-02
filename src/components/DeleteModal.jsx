import { Modal } from "@mantine/core";
import Cookies from "js-cookie";
import React from "react";
import { useDeleteContactMutation } from "../redux/api/contactApi";
import { Toaster, toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFrequent, toggleFav } from "../redux/services/contactSlice";

const DeleteModal = ({ id, opened, close, isFavItem }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const [deleteContact] = useDeleteContactMutation();
  const dispatch = useDispatch();

  // const { favorite } = useSelector((store) => store.contactSlice);

  // const isFavItem = favorite?.find((item) => item.id == contact.id);

  const deleteContactHandler = async (id) => {
    const { data } = await toast.promise(deleteContact({ id, token }), {
      loading: "Working...",
      success: "Contact Deleted",
      error: "Somthing Wrong!",
    });
    if (data?.success && location.pathname === `/detail/${id}`) {
      navigate("/");
    }
    dispatch(removeFrequent(id));
    if(isFavItem){
      dispatch(toggleFav(isFavItem));
    }
    
    close();
  };
  return (
    <div>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Modal
        opened={opened}
        onClose={close}
        radius="md"
        centered
        withCloseButton={false}
      >
        <div className=" px-5 py-2 space-y-4">
          <h1 className=" font-[500] text-gray-700">Delete from contact ?</h1>
          <p className=" text-sm text-gray-500">
            This contact will be permanently deleted from this account after 30
            days.
          </p>
          <div className=" flex items-center gap-4 justify-end">
            <button
              onClick={close}
              className=" text-sm text-blue-600 px-4 py-2 rounded hover:bg-blue-50"
            >
              Cancel
            </button>
            <button
              className=" text-sm text-blue-600 px-4 py-2 rounded hover:bg-blue-50"
              onClick={() => deleteContactHandler(id)}
            >
              Move to the bin
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteModal;
